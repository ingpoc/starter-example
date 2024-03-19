import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react'; // Adjust based on your Web3 library

interface AuthContextType {
  isAuthenticated: boolean;
  user: any; // Define a more specific type based on your needs
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { connected, connect, disconnect } = useWallet(); // Adjust based on your Web3 library
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    if (connected) {
      // Fetch or define user details based on the wallet connection
      setUser({ /* User details */ });
    } else {
      setUser(null);
    }
  }, [connected]);

  const signIn = async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const signOut = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}