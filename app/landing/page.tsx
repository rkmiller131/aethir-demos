import PlayNow from "./(components)/PlayNow";

export default function Landing() {
  return (
    <div className="w-[100dvw] h-[100dvh]">
      <PlayNow />
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="h-full w-full object-cover z-[-1]"
      >
        <source src="https://cdn.glitch.me/c4f540ac-7f7c-41b2-ae89-9e2617351aa6/banner-trailer.webm?v=1742318229191" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
