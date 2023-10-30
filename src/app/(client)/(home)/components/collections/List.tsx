import Link from 'next/link';
export interface GameCollectionsProps {
  collections: string[];
}
export default function GameCollections({ collections }: GameCollectionsProps) {
  return (
    <div className="flex justify-center gap-2 flex-wrap">
      {collections.map((collection) => {
        return (
          <Link key={collection} href={`/games/collections/${collection}`} className="mb-2">
            <span className="border rounded-full py-2 px-5 flex text-base text-slate-800 border-purple-400 bg-gradient-to-br from-purple-50 from-0% to-[#fff5ff] to-100% hover:border-transparent hover:from-purple-500 hover:to-pink-500 hover:text-white">
              {collection}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
