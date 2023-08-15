"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { User } from "@/types";

interface AuthContext {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContext>({
  user: null,
  setUser: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
  user: User | null;
}

export const AuthProvider = ({ user, children }: AuthProviderProps) => {
  const [_user, setUser] = useState<User | null>(user);

  function setAuthUser(user: User | null) {
    setUser(user);
  }

  return (
    <AuthContext.Provider value={{ user: _user, setUser: setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
