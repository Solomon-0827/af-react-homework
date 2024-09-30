import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/prisma/prisma';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const userItems = await prisma.user_items.findMany();
    return NextResponse.json(userItems);
  } catch (error) {
    console.error('Error fetching user items:', error);
    return NextResponse.json({ message: 'Internal Server Error' });
  }
}