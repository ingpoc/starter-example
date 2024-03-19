import { useMemo } from 'react';
import { FC, PropsWithChildren } from 'react';
import {
  ConnectionProvider,
  WalletProvider as WalletAdapterProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';

// Default styles
require('@solana/wallet-adapter-react-ui/styles.css');

const WalletProvider: FC<PropsWithChildren> = ({ children }) => {
  const endpoint = useMemo(() => (
    process.env.NEXT_PUBLIC_SOLANA_RPC_ENDPOINT || 'https://api.mainnet-beta.solana.com'
  ), []);

  const wallets = useMemo(() => [new SolflareWalletAdapter()], []);

  // Ideally, you would handle errors here or provide a fallback UI
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletAdapterProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletAdapterProvider>
    </ConnectionProvider>
  );
};

export default WalletProvider;
