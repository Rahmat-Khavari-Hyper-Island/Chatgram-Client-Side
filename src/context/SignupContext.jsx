import React, { createContext, useState } from "react";

const SignupContext = createContext();

export const SignupProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const signup = async (userData) => {
    try {
      const response = await fetch(
        "https://vercel-server-gold.vercel.app/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const { token } = await response.json();
      localStorage.setItem("token", token);
      window.location.href = "/";
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <SignupContext.Provider value={{ signup, error }}>
      {children}
    </SignupContext.Provider>
  );
};

export default SignupContext;
