"use client";
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import WalletProvider  from '@/app/components/WalletProvider';
import { useState } from 'react';

export default function RootLayout({ 
  children,
}: {
  children: React.ReactNode;
}) {

  const [autoConnect, setAutoConnect] = useState(false);


  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}> 
      <WalletProvider>
        {children}
      </WalletProvider>
      </body>
    </html>
  );
}
