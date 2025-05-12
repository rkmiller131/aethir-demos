'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  checkGameSessionValidity,
  endGame,
} from '@/app/actions';
import Stinger from '@/components/Stinger';
import { APP_PAGES } from '@/app/lib/constants';
import EmbeddedProxy from '../(components)/EmbeddedProxy';

export default function Play({ slug }: { slug: number | null }) {
  const router = useRouter();
  const [stingerEnded, setStingerEnded] = useState(false);
  const [timeoutAlert, setTimeoutAlert] = useState(false);
  // const iframeRef = useRef<HTMLIFrameElement>(null);
  let route;

  switch (slug) {
    case 0:
      route = APP_PAGES.LANDING;
      break;
    case 1:
      route = APP_PAGES.NETFLIX;
      break;
    case 2:
      route = APP_PAGES.GAMEPASS;
      break;
    case 3:
      route = APP_PAGES.LUNA;
      break;
    default:
      route = APP_PAGES.LANDING;
  }

  // const loadGameUrl = async () => {
  //   try {
  //     const result = provider ? await getGameStreamUrl(provider) : await getGameStreamUrl();
  //     if (result.success && iframeRef.current && result.url) {
  //       iframeRef.current.src = result.url;
  //     }
  //   } catch (error) {
  //     console.error('Error loading game URL:', error);
  //     setTimeout(() => {
  //       router.push(route);
  //     }, 2000);
  //   }
  // };

  const handleBack = async () => {
    await endGame(route);
  };

  const handleStingerEnd = (): void => {
    setStingerEnded(true);
    sessionStorage.setItem('hasStingerPlayed', 'true');
  };

  useEffect(() => {
    // if (stingerEnded) {
    //   loadGameUrl();
    // }

    const checkSessionValidity = async () => {
      try {
        const result = await checkGameSessionValidity();
        if (!result.isValid) {
          setTimeoutAlert(true);
          await endGame(route);
          setTimeout(() => {
            router.push(route);
          }, 3000);
        }
      } catch (error) {
        console.error('Error checking game session validity:', error);
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
        navigator.sendBeacon('/api/end-session', formData);
      }

      event.preventDefault();
      return ''; // For older browsers
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stingerEnded]);

  if (!stingerEnded) {
    if (slug === 1) {
      return <Stinger onEnd={handleStingerEnd} version={slug} />;
    } else if (slug === 0 || slug === 2 || slug === 3) {
      handleStingerEnd();
      return null;
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
      <span
        className={`${
          timeoutAlert ? 'block' : 'hidden'
        } absolute z-20 text-3xl left-[40%] top-[40%] text-white`}
      >
        SESSION TIMEOUT
      </span>
      {/* <iframe
        ref={iframeRef}
        className="absolute z-10 w-full h-full border-none top-0 left-0"
        title="Project Aragorn"
        src="about:blank"
        allowFullScreen
        allow="autoplay; encrypted-media;"
      /> */}
      {stingerEnded && <EmbeddedProxy slug={slug}/>}
    </div>
  );
}
