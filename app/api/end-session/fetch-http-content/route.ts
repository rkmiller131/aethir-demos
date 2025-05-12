// app/api/fetch-http-content/route.ts
import { GAMELIFT_URL } from '@/app/lib/constants';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(GAMELIFT_URL);
    const html = await response.text();

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch {
    return new NextResponse('Error fetching http content', {
      status: 500,
    });
  }
}