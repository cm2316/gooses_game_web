import Link from 'next/link';
export interface GameCategorysProps {
  categorys: string[];
}
export default function GameCategorys({ categorys }: GameCategorysProps) {
  return (
    <div className="flex justify-center gap-2 flex-wrap">
      {categorys.map((category) => {
        return (
          <Link key={category} href={`/games/categorys/${category}`} className="mb-2">
            <span className="border rounded-full py-2 px-5 flex text-base text-slate-800 border-purple-400 bg-gradient-to-br from-purple-50 from-0% to-[#fff5ff] to-100% hover:border-transparent hover:from-purple-500 hover:to-pink-500 hover:text-white">
              {category}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
