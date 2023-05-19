import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthContext.Provider value={{ id, setId, password, setPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
