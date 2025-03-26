import Navbar from './(components)/UI/Navbar';
import GamingProviders from './(components)/UI/Providers';
import TopCarousel from './(components)/UI/TopCarousel';
import Carousel from './(components)/UI/Carousel';

export default function GamePass() {
  return (
    <div className="flex text-white font-sans bggp">
      <Navbar />
      <div className="flex flex-col mx-auto">
        <h1 className="text-4xl font-bold mb-2 mt-12">Game Pass</h1>
        <h2 className="text-xl mb-8 text-white/60">What&apos;s Happening</h2>
        <TopCarousel />
        <GamingProviders />
        <Carousel />
      </div>
    </div>
  );
}
