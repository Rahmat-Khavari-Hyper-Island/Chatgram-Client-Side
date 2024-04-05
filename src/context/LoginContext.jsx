import React, { createContext, useContext, useState } from "react";
export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [error, setError] = useState("");

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch(
        "https://vercel-server-gold.vercel.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }

      const { token } = await response.json();
      localStorage.setItem("token", token);

      window.location.href = "/";
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <LoginContext.Provider value={{ handleLogin, error }}>
      {children}
    </LoginContext.Provider>
  );
};
