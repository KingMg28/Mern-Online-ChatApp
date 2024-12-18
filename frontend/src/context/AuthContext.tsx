import React, { Dispatch, ReactNode, useContext, useState } from "react";

type AuthType = {
  _id: string;
  fullName: string;
  username: string;
  profilePic: string;
} | null;

interface AuthContextType {
  auth: AuthType;
  setAuth: Dispatch<React.SetStateAction<AuthType>>;
}

export const AuthContext = React.createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  
  const [auth, setAuth] = useState<AuthType>(() => {
    const savedAuth = localStorage.getItem("online-chat");
    return savedAuth ? JSON.parse(savedAuth) : null; 
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
