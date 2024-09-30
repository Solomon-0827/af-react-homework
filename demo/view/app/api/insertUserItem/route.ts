import { prisma } from '@/prisma/prisma';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const { name, userId } = await req.json();
    if (!name || !userId) {
      return NextResponse.json({ message: 'Name and userId are required.' }, { status: 400 });
    }

    const newItem = await prisma.user_items.create({
      data: {
        name,
        user_id: userId,
      },
    });

    return NextResponse.json({
      id: newItem.id,
      user_id: newItem.user_id,
      name: newItem.name,
    });
  } catch (error) {
    console.error('Error inserting user item:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};