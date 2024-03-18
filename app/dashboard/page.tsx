"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { pages } from 'next/dist/build/templates/app-page';

export default function Page() {
  const { connection } = useConnection(); 
  const { connected, connect, disconnect } = useWallet();
  const router = useRouter();
  const [isDisconnected, setIsDisconnected] = useState(false); 
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [shouldRedirect, setShouldRedirect] = useState(false); // Add redirect state

  useEffect(() => {
    if (!connected) {
      console.log('Wallet not connected');
      setIsDisconnected(true);
      setIsLoading(false); // Connection state determined
    } 
  }, [connected]); 

  useEffect(() => {
    if (isDisconnected) {
      console.log('Connecting wallet');
      connect().catch((error) => {
        // Handle connection errors
      }).finally(() => {
        setIsLoading(false); // Connection attempt finished
      });
    }
  }, [isDisconnected, connection]); 

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <p>Dashboard Page</p>;
}
