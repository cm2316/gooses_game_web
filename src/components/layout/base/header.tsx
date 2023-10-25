import Logo from '@/assets/logo-full.png';
import Link from 'next/link';
import SearchDrawer from './drawer';
export default function BaseHeader() {
  return (
    <header className="flex items-center sticky top-0 z-50 h-16 bg-black/80 before:left-0 before:backdrop-blur-xl before:absolute before:w-full before:h-full">
      <div className="container mx-auto flex justify-between z-10">
        <Link href="/">
          <img src={Logo.src} alt="" className="h-10" />
        </Link>
        <SearchDrawer />
      </div>
    </header>
  );
}
