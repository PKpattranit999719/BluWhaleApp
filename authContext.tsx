import React, { createContext, useState, useContext, ReactNode } from "react";

type AuthContextType = {
  loggedIn: boolean;
  username: string;
  login: (username: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  loggedIn: false,
  username: "",
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const login = (username: string) => {
    setLoggedIn(true);
    setUsername(username);
  };

  const logout = () => {
    setLoggedIn(false);
    setUsername("");
  };

  return (
    <AuthContext.Provider value={{ loggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
