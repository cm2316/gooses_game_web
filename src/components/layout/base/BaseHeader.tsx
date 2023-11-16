import Link from 'next/link';
import HistoryDrawer from './HistoryDrawer';
import SearchDrawer from './SearchDrawer';
import User from './User';
export default function BaseHeader() {
  return (
    <header className="flex-shrink-0 flex items-center sticky top-0 z-50 h-16 bg-black/80 before:backdrop-blur-xl before:absolute before:inset-0">
      <div className="container flex justify-between z-10">
        <Link href="/">
          <img src="/images/logo-full.png" alt="" className="h-10" />
        </Link>
        <div className="flex items-center gap-3">
          <HistoryDrawer />
          <SearchDrawer />
          <User />
        </div>
      </div>
    </header>
  );
}
