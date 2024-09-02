import { NextResponse } from "next/server"

export const GET = () => {
  const data = new Array(4).fill(1).map((_, index) => ({ id: index + 1 }));
  return NextResponse.json(data);
}