//DeleteContext.jsx
import React, { createContext, useContext } from "react";

const DeleteContext = createContext();

export const useDeleteMessage = () => useContext(DeleteContext);

export const DeleteProvider = ({ children }) => {
  const deleteMessage = async (messageId) => {
    try {
      const response = await fetch(
        `https://vercel-server-gold.vercel.app/messages/${messageId}`, // Update URL here
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete message");
      }
      console.log("Message deleted successfully");
    } catch (error) {
      console.log(
        "You don't have permission to delete other people's messages."
      );

      //console.error("Error deleting message:", error);
    }
  };

  return (
    <DeleteContext.Provider value={{ deleteMessage }}>
      {children}
    </DeleteContext.Provider>
  );
};
