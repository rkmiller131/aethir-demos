import Image from 'next/image';
import gamingProviders from '../../../lib/games.json';

export default function GamingProviders() {
  return (
    <div className="flex flex-row py-12 max-w-7xl mx-auto px-6 gap-x-4">
      <div className="bg-gradient-to-r from-red-500 to-red-300 p-4 px-12 rounded-md text-center">
        <h1>Electronic Arts</h1>
      </div>
      <div className="bg-gradient-to-r from-green-500 to-green-700 p-4 px-12 rounded-md text-center">
        <h1>XBOX Studios</h1>
      </div>
      <div className="bg-gradient-to-r from-red-500 to-red-300 p-4 px-12 rounded-md text-center">
        <h1>Electronic Arts</h1>
      </div>
      <div className="bg-gradient-to-r from-red-500 to-red-300 p-4 px-12 rounded-md text-center">
        <h1>Electronic Arts</h1>
      </div>
    </div>
  );
}
