import PlayNowButton from './(components)/buttons/PlayNowButton';
import Carousel from './(components)/UI/Carousel';
import Navbar from './(components)/UI/Navbar';

export default function GamePass() {
  return (
    <div className="flex text-white font-sans">
      <Navbar />
      <div className="flex flex-col p-4">
        <h1 className="text-3xl font-bold mb-2">Game Pass</h1>
        <h2 className="text-xl mb-2">What&apos;s Happening</h2>
        <Carousel />
        <PlayNowButton />
      </div>
    </div>
  );
}
