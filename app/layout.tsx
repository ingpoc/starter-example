import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import WalletProvider  from '@/app/components/WalletProvider';

export default function RootLayout({ 
  children,
}: {
  children: React.ReactNode;
}) {
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
