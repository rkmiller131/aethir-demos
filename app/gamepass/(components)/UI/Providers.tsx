export default function GamingProviders() {
  return (
    <div className="flex flex-row py-12 max-w-7xl mx-auto gap-x-4">
      {' '}
      <div className="bg-gradient-to-r from-red-600 to-orange-400 py-8 px-24 rounded-md text-center items-center cursor-not-allowed my-auto hover:brightness-90 transition">
        <h1 className="text-white font-bold text-lg whitespace-nowrap">
          Electronic Arts
        </h1>
      </div>
      <div className="bg-gradient-to-r from-green-600 to-teal-400 py-8 px-24 rounded-md text-center items-center cursor-not-allowed my-auto hover:brightness-90 transition">
        <h1 className="text-white font-bold text-lg whitespace-nowrap">
          XBOX Studios
        </h1>
      </div>
      <div className="bg-gradient-to-r from-blue-700 to-indigo-400 py-8 px-24 rounded-md text-center items-center cursor-not-allowed my-auto hover:brightness-90 transition">
        <h1 className="text-white font-bold text-lg whitespace-nowrap">
          PlayStation Studios
        </h1>
      </div>
      <div className="bg-gradient-to-r from-purple-600 to-fuchsia-400 py-8 px-24 rounded-md text-center items-center cursor-not-allowed my-auto hover:brightness-90 transition">
        <h1 className="text-white font-bold text-lg whitespace-nowrap">
          Ubisoft
        </h1>
      </div>
    </div>
  );
}
