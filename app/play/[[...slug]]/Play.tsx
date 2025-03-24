"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';
import { checkGameSessionValidity, endGame, getGameStreamUrl } from "@/app/actions";
import Stinger from "@/components/Stinger";
import { APP_PAGES } from "@/app/lib/constants";
import { AppPageType } from "@/app/lib/types";

export default function Play({ slug }: { slug: number | null }) {
  const router = useRouter();
  const [stingerEnded, setStingerEnded] = useState(false);
  const [timeoutAlert, setTimeoutAlert] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const route = slug === 0 ? APP_PAGES.LANDING : APP_PAGES.NETFLIX;

  const loadGameUrl = async () => {
    try {
      const result = await getGameStreamUrl();
      if (result.success && iframeRef.current && result.url) {
        iframeRef.current.src = result.url;
      }
    } catch (error) {
      console.error("Error loading game URL:", error);
      setTimeout(() => {
        router.push(route);
      }, 2000);
    }
  }

  const handleBack = async () => {
    await endGame(route as AppPageType);
  }

  const handleStingerEnd = (): void => {
    setStingerEnded(true);
    sessionStorage.setItem("hasStingerPlayed", "true");
  };

  useEffect(() => {
    if (stingerEnded) {
      loadGameUrl();
    }

    const checkSessionValidity = async () => {
      try {
        const result = await checkGameSessionValidity();
        if (!result.isValid) {
          setTimeoutAlert(true);
          await endGame(route as AppPageType);
          setTimeout(() => {
            router.push(route);
          }, 3000);
        }
      } catch (error) {
        console.error("Error checking game session validity:", error);
      }
    };

    // every 10 sec test for timeout
    const intervalId = setInterval(() => {
      checkSessionValidity();
    }, 10000);

    // Handle tab closing/refreshing
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (navigator.sendBeacon) {
        // Create a FormData object to send
        const formData = new FormData();
        navigator.sendBeacon("/api/end-session", formData);
      }

      event.preventDefault();
      return ""; // For older browsers
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stingerEnded]);

  if (!stingerEnded) {
    if (slug === 0) {
      handleStingerEnd();
      return null;
    } else {
      return <Stinger onEnd={handleStingerEnd} version={slug}/>;
    }
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