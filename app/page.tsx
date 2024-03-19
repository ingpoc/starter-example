import AcmeLogo from '@/app/ui/acme-logo';
import { lusitana } from '@/app/ui/fonts';
import dynamic from 'next/dynamic';
// Removed the static import of WalletConnect

const Image = dynamic(() => import('next/image'), { ssr: false });
const WalletConnect = dynamic(() => import('@/app/components/WalletConnect'), { ssr: false });

export default function Page() {

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-3 md:h-40">
         <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to SolState.</strong> Own a Piece of  {' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
            Prime Real Estate
            </a>
            ,Without Breaking the Bank.
          </p>
         
          <WalletConnect className="hidden w-fit text-sky-100 hover:text-gray-800 md:order-2 md:flex"/>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
        <Image
        src="/hero-desktop.png"
        width={1000}
        height={760}
        priority
        className="hidden md:block"
        alt="Screenshots of the dashboard project showing desktop version"
      />
        </div>
      </div>
    </main>
  );
}
