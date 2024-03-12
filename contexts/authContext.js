import * as React from "react";
import useAuth from "../hooks/useAuth";

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const AllContext = useAuth();
  return (
    <AuthContext.Provider value={AllContext}>{children}</AuthContext.Provider>
  );
};
