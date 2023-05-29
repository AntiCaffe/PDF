import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const logout = () => {
    setId("");
    setPassword("");
  };

  return (
    <AuthContext.Provider value={{ id, setId, password, setPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
