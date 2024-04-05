import React, { createContext, useContext, useState } from "react";

const UpdateMessageContext = createContext();

export const useUpdateMessage = () => useContext(UpdateMessageContext);

export const UpdateMessageProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const updateMessage = async (messageId, messageText) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await fetch(
        `https://vercel-server-gold.vercel.app/update_message/${messageId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message_text: messageText }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }

      setError(null);
      return true;
    } catch (error) {
      // Handle errors
      console.error("Error updating message:", error);
      setError(error.message);
      return false;
    }
  };

  return (
    <UpdateMessageContext.Provider value={{ updateMessage, error }}>
      {children}
    </UpdateMessageContext.Provider>
  );
};
