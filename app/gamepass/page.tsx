import Carousel from './(components)/UI/Carousel';
import LgCarousel from './(components)/UI/LgCarousel';
import Navbar from './(components)/UI/Navbar';
import GamingProviders from './(components)/UI/Providers';

export default function GamePass() {
  return (
    <div className="flex text-white font-sans">
      <Navbar />
      <div className="flex flex-col p-4">
        <h1 className="text-3xl font-bold mb-2">Game Pass</h1>
        <h2 className="text-xl mb-8">What&apos;s Happening</h2>
        <LgCarousel />
        <GamingProviders />
        <Carousel />
      </div>
    </div>
  );
}
