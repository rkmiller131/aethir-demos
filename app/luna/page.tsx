import Navbar from "./(components)/navbar/Navbar";
import Hero from "./(components)/Hero";
import GameGrid from "./(components)/grid/GameGrid";

export default function Luna() {
  return (
    <div className="flex flex-col gap-4 bg-[#0f071a] text-white h-screen">
      <Navbar />
      <Hero />
      <GameGrid />
    </div>
  );
}