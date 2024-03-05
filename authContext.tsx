import React, { createContext, useState, useContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  loggedIn: boolean;
  username: string;
  email: string;
  birthdate: Date | null;
  login: (username: string) => void;
  logout: () => void;
  register: (username: string, email: string, birthdate: Date, password: string) => void;
};

const AuthContext = createContext<AuthContextType>({
  loggedIn: false,
  username: "",
  email: "",
  birthdate: null,
  login: () => {},
  logout: () => {},
  register: () => {},
});

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState<Date | null>(null);

  const login = (username: string) => {
    setLoggedIn(true);
    setUsername(username);
  };

  const logout = () => {
    setLoggedIn(false);
    setUsername("");
    setEmail("");
    setBirthdate(null);
  };

  const register = async (username: string, email: string, birthdate: Date, password: string) => {
    // Perform registration logic here
    // For simplicity, we'll just save registration details to AsyncStorage
    try {
      await AsyncStorage.setItem('loggedInUserDetails', JSON.stringify({ username, email, birthdate }));
      // Call login to update loggedIn state and username
      login(username);
    } catch (error) {
      console.error('Error storing registration details: ', error);
      // You might want to handle this error in your app
    }
  };

  return (
    <AuthContext.Provider value={{ loggedIn, username, email, birthdate, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
