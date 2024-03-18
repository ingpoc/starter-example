"use client";
import {
  WalletIcon,
} from "@heroicons/react/20/solid";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Fragment, useEffect, useState } from "react";
import { useRouter, usePathname } from 'next/navigation';

/* Wallet button, for now used only in the mobile menu */
const WalletConnect = ({ className = "" }) => {
  const walletModal = useWalletModal();
  const { connected, disconnect, publicKey, wallet } = useWallet();


  const openModal = () => walletModal.setVisible(true);
  const router = useRouter();
  const pathname = usePathname();



  useEffect(() => {
    if (connected && publicKey && wallet) {
      console.log('Redirecting to dashboard')
      router.push('/dashboard'); 
    }
  }, [connected, publicKey]);

 

  if ((!connected || !wallet || !publicKey)) {
    return (
      <button
        onClick={openModal}
        className={
          className +
          " flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base "
        }>


        <WalletIcon className="mr-2 h-5 w-5" />
        <p className="mx-auto font-semibold">Connect wallet</p>
      </button>
    );
  } 
};

export default WalletConnect;
