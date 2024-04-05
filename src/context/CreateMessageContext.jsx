// CreateMessageContext.jsx
import React, { createContext, useContext, useState } from "react";

const CreateMessageContext = createContext();

export const useCreateMessageContext = () => useContext(CreateMessageContext);

export const CreateMessageProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createMessage = async (message_text) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://vercel-server-gold.vercel.app/create_message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ message_text }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create message: " + response.statusText);
      }

      const data = await response.json();
      console.log("Message created with ID:", data.messageId);
    } catch (error) {
      console.error("Error creating message:", error);
      setError("An error occurred while creating the message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreateMessageContext.Provider value={{ createMessage, loading, error }}>
      {children}
    </CreateMessageContext.Provider>
  );
};
