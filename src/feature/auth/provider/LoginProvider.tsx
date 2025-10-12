"use client";

import { createContext, useContext, useState } from "react";

interface LoginContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string;
  setError: (error: string) => void;
  isErrorDialogOpen: boolean;
  setIsErrorDialogOpen: (open: boolean) => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);

  return (
    <LoginContext.Provider
      value={{
        isLoading,
        setIsLoading,
        error,
        setError,
        isErrorDialogOpen,
        setIsErrorDialogOpen,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};
