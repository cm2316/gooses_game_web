'use client';
import Link from 'next/link';
export default function BaseFooter() {
  return (
    <footer className="flex justify-center items-center py-3 px-6">
      <Link href="/">
        <span style={{ color: '#999' }}>www.game520.online</span>
      </Link>
    </footer>
  );
}
