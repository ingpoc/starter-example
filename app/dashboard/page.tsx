"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';

const WalletConnect = dynamic(() => import('@/app/components/WalletConnect'), { ssr: false });
const Image = dynamic(() => import('next/image'), { ssr: false });

export default function Page() {
  const { connected } = useWallet();

  if (!connected) return null;

  return <p>Dashboard Page</p>;
}
