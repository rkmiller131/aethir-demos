'use client';

import { getGameStreamUrl } from '@/app/actions';
import { StreamProviderType } from '@/app/lib/types';
import { useState, useEffect, useRef } from 'react';

export default function EmbeddedProxy({ slug }: { slug: number | null }) {
  const [content, setContent] = useState('Loading...');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  let streamProvider: StreamProviderType = 'GAMELIFT';
  if (slug === 1) {
    streamProvider = 'AETHIR';
  }

  useEffect(() => {
    const loadGameUrl = async () => {
      try {
        const result = await getGameStreamUrl(streamProvider);
        if (result.success) {
          if (result.isHttp) {
            // Proxy that fetches http site and serves within https context
            const response = await fetch('/api/fetch-http-content');
            const html = await response.text();
            setContent(html);
          } else if (iframeRef.current && result.url) {
            iframeRef.current.src = result.url;
          }
        }
      } catch (error) {
        console.error('Error loading game URL:', error);
      }
    };
    loadGameUrl();
  }, [streamProvider]);

  // Only use srcDoc if we have content from the HTTP site
  const iframeProps = content !== 'Loading...'
    ? { srcDoc: content }
    : { src: "about:blank" };

  return (
    <iframe
      {...iframeProps}
      ref={iframeRef}
      className="absolute z-10 w-full h-full border-none top-0 left-0"
      title="Project Aragorn"
      allowFullScreen
      allow="autoplay; encrypted-media;"
      sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
    />
  );
}