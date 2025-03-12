"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import NetflixStinger from "@/components/NetflixStinger";
import { checkGameAvailability, endGame, getGameStreamUrl } from "../actions";


export default function Play() {
  const router = useRouter();
  const [stingerEnded, setStingerEnded] = useState(false);
  const [timeoutAlert, setTimeoutAlert] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const loadGameUrl = async () => {
    try {
      const result = await getGameStreamUrl();
      if (result.success && iframeRef.current && result.url) {
        iframeRef.current.src = result.url;
      }
    } catch (error) {
      console.error("Error loading game URL:", error);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }

  const handleBack = async () => {
    await endGame();
  }

  useEffect(() => {
    if (stingerEnded) {
      loadGameUrl();
    }

    const checkAvailability = async () => {
      try {
        const result = await checkGameAvailability();
        if (result.isAvailable) {
          setTimeoutAlert(true);
          await endGame();
          setTimeout(() => {
            router.push("/");
          }, 3000);
        }
      } catch (error) {
        console.error("Error checking game availability:", error);
      }
    };

    // every 10 sec test for timeout
    const intervalId = setInterval(() => {
      checkAvailability();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [stingerEnded]);

  const handleStingerEnd = ():void => {
    setStingerEnded(true);
    sessionStorage.setItem("hasStingerPlayed", "true");
  };

  if (!stingerEnded) {
    return <NetflixStinger onEnd={handleStingerEnd} />;
  }

  return (
    <div className="bg-black">
      <button
        className="absolute z-20 bg-black/75 p-4 text-white rounded-md"
        onClick={handleBack}
      >
        &#8592; <span className="underline">Exit Stream</span>
      </button>
      <span className={`${timeoutAlert ? "block" : "hidden"} absolute z-20 text-3xl left-[40%] top-[40%] text-white`}>
        SESSION TIMEOUT
      </span>
      <iframe
        ref={iframeRef}
        className="absolute z-10 w-full h-full border-none top-0 left-0"
        title="Project Aragorn"
        src="about:blank"
        allowFullScreen
      />
    </div>
  );
}