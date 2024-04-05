//useLikeContext.jsx
import React, { createContext, useContext } from "react";
const LikeContext = createContext();
export const useLikeContext = () => useContext(LikeContext);

export const LikeProvider = ({ children }) => {
  const createLike = async (message_id) => {
    // Only accept message_id
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await fetch(
        `https://vercel-server-gold.vercel.app/create_like/${message_id}`,
        {
          // Pass message_id in the URL
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}), // No need to send user_id in the body
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create like");
      }

      return data;
    } catch (error) {
      console.error("Error toggling like:", error);
      throw error;
    }
  };

  const getLikes = async () => {
    try {
      const response = await fetch(
        "https://vercel-server-gold.vercel.app/likes"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch likes");
      }

      const likes = await response.json();
      return likes;
    } catch (error) {
      console.error("Error fetching likes:", error);
      throw error;
    }
  };

  return (
    <LikeContext.Provider value={{ createLike, getLikes }}>
      {children}
    </LikeContext.Provider>
  );
};
