import { prisma } from '@/prisma/prisma';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const { userId, theme, location } = await req.json();
    console.log("Now the location is: ", location);
    if (!theme || !userId) {
      return NextResponse.json({ message: 'Name and userId are required.' }, { status: 400 });
    }

    const newItem = await prisma.user_setting.create({
      data: {
        theme,
        user_id: userId,
      },
    });

    return NextResponse.json({
      id: newItem.id,
      userId: newItem.user_id,
      theme: newItem.theme,
    });
  } catch (error) {
    console.error('Error inserting user item:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};