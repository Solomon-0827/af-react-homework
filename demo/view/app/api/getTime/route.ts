import { NextResponse } from 'next/server';

const delay = () => new Promise(resolve => setTimeout(resolve, 5000));

export const GET = async () => {
  await delay();
  const time = new Date();
  return NextResponse.json({ time: time });
}