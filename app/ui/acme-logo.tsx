import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >

<Image
        src="/solana-blue.png"
        width={60}
        height={60}
        className="hidden md:block mr-2"
        alt="Screenshots of the dashboard project showing desktop version"
      />
      <p className="text-[44px]">Solstate</p>
    </div>
  );
}
