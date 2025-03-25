import { BookUser } from 'lucide-react';

export default function GamingProviders() {
  return (
    <div className="flex flex-row py-12 max-w-7xl mx-auto gap-x-4">
      <div className="bg-gradient-to-r from-red-500 to-red-300 py-8 px-24 rounded-md text-center items-center my-auto">
        <h1 className="whitespace-nowrap">Electronic Arts</h1>
      </div>
      <div className="bg-gradient-to-r from-green-500 to-green-700 py-8 px-24 rounded-md text-center items-center my-auto">
        <h1 className="whitespace-nowrap">XBOX Studios</h1>
      </div>
      <div className="bg-gradient-to-r from-red-500 to-red-300 py-8 px-24 rounded-md text-center items-center my-auto">
        <h1 className="whitespace-nowrap">Electronic Arts</h1>
      </div>
      <div className="flex flex-row bg-gradient-to-r from-red-500 to-red-300 py-8 px-24 rounded-md text-center items-center my-auto">
        <BookUser className="mr-1" />
        <h1 className="whitespace-nowrap">SEE ALL PLANS</h1>
      </div>
    </div>
  );
}
