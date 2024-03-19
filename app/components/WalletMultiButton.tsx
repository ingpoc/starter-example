"use client";
import { truncatePublicKey } from "@/app/utils/truncatePublicKey";
import { Popover, Transition } from "@headlessui/react";
import {
  ArrowRightOnRectangleIcon,
  ArrowsRightLeftIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/20/solid";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import React, { Fragment, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

/* Wallet button, for now used only in the mobile menu */
const WalletMultiButton = ({ className = "" }) => {
  const walletModal = useWalletModal();
  const { connected, disconnect, publicKey, wallet } = useWallet();
  const [copied, setCopied] = useState(false);
  const router = useRouter(); // Import and use `useRouter` from Next.js

  const openModal = () => walletModal.setVisible(true);

  const handleDisconnect = async () => {
    console.log('Disconnecting wallet & Routing to homepage');

    await disconnect();
    router.push('/'); // Use Next.js router to navigate to the homepage
  };

  const handleCopy = async () => {
    if (publicKey) {
      await navigator.clipboard.writeText(publicKey.toBase58());
      setCopied(true);
    }
  };

  useEffect(() => {
    let timeoutId: number;
    if (copied) {
      timeoutId = window.setTimeout(() => setCopied(false), 3000);
    }
    return () => clearTimeout(timeoutId);
  }, [copied]);

  // check wallet , connected and publickey not empty and not null
  return (
    connected &&
    wallet &&
    publicKey && (
      <Popover>
        <Popover.Button
          className={
            className +
            " flex items-center gap-2 rounded-lg p-2 text-sm text-gray-800 hover:bg-gray-200"
          }
        >
          <Image
            src={wallet.adapter.icon}
            alt={wallet.adapter.name}
            width={32}
            height={32}
            className="h-5 w-5"
          />
          <p className="mx-auto font-bold">
            {truncatePublicKey(publicKey.toBase58())}
          </p>
        </Popover.Button>
        <ScaleAndFadeTransition>
          <Popover.Panel className="absolute mt-4 w-48 divide-y divide-gray-100 rounded-md bg-gray-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-1 space-y-1">
              <button
                onClick={handleCopy}
                className="flex items-center rounded-md px-2 py-2 text-sm text-gray-800 hover:bg-gray-200"
              >
                {copied ? (
                  <ClipboardDocumentCheckIcon className="mr-2 h-5 w-5" />
                ) : (
                  <ClipboardDocumentIcon className="mr-2 h-5 w-5" />
                )}
                Copy address
              </button>
              <button
                onClick={openModal}
                className="flex items-center rounded-md px-2 py-2 text-sm text-gray-800 hover:bg-gray-200"
              >
                <ArrowsRightLeftIcon className="mr-2 h-5 w-5" />
                Change wallet...
              </button>
              <button
                onClick={handleDisconnect}
                className="flex items-center rounded-md px-2 py-2 text-sm text-gray-800 hover:bg-gray-200"
              >
                <ArrowRightOnRectangleIcon className="mr-2 h-5 w-5" />
                Disconnect
              </button>
            </div>
          </Popover.Panel>
        </ScaleAndFadeTransition>
      </Popover>
    )
  );
};


const ScaleAndFadeTransition = ({ children }: { children: ReactNode }) => (
  <Transition
    as={Fragment}
    enter="transition ease-out duration-100"
    enterFrom="transform opacity-0 scale-95"
    enterTo="transform opacity-100 scale-100"
    leave="transition ease-in duration-75"
    leaveFrom="transform opacity-100 scale-100"
    leaveTo="transform opacity-0 scale-95"
  >
    {children}
  </Transition>
);

export default React.memo(WalletMultiButton);
