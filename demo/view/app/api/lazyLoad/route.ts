import { NextResponse, NextRequest } from 'next/server';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const time = searchParams.get('time');
  
  if (!time) {
    return NextResponse.json({ error: 'Missing time parameter' }, { status: 400 });
  }

  const delayTime = parseInt(time, 10) * 1000; 
  await delay(delayTime);
  return NextResponse.json({ status: 'true' });
}