import Image from "next/image";

export default function GameGridHeaders({ variant }: { variant: number }) {
  if (variant === 0) {
    return (
      <div className="flex gap-2 items-center">
        <Image
          src="https://m.media-amazon.com/images/G/01/T/TC05316420/A07531864/prime_logo_blue_no_padding._CB1198675309_SY24_QL65_FMwebp_.png"
          alt="Prime Logo"
          width={65}
          height={24}
        />
        <span className="text-lg lg:text-2xl">
          FREE TO PLAY
        </span>
      </div>
    );
  }
  if (variant === 1) {
    return (
      <div className="flex gap-2 items-center">
        <span className="text-lg lg:text-2xl">
          FORTNITE EXPERIENCES
        </span>
      </div>
    );
  }
  return (
    <div className="flex gap-2 items-center">
      <Image
          src="https://m.media-amazon.com/images/G/01/T/TC05316420/A07531864/StoreDestination/gog_logo._FMpng_SY24_QL65_FMwebp_.png"
          alt="GOG Logo"
          width={26}
          height={24}
      />
      <span className="text-lg lg:text-2xl">
        GOG GAMES
      </span>
    </div>
  );
}