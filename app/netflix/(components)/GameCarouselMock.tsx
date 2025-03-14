// NOTE - Delphi decided no Game Carousel, but keeping for reference.
export default function GameCarouselMock() {
  const gameList = new Array(10).fill({});
  return (
    <div className="overflow-x-hidden whitespace-nowrap">
      <div className="flex gap-2 items-center">
        <span>Games</span>
        <span className="font-bold text-sm px-2 border border-b-red-500 border-t-pink-600 border-l-pink-500 border-r-orange-500 rounded-lg">
          BETA
        </span>
      </div>
      <div className="flex gap-2 mt-4">
        {/* Just a placeholder/outline of games list */}
        {gameList.map((_, i) =>
          <div key={i} className="w-[275px] h-[275px] border border-red-500 rounded-sm shrink-0"/>
        )}
      </div>
    </div>
  );
}