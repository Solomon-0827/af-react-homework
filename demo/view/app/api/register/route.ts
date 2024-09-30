
import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function POST(request: Request) {
  try {
    const { username, password, source } = await request.json();
    if (source === "regular") await delay(1500);

    if (!username) {
      return NextResponse.json(
        { error: 'Username and password are required.' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: { username },
    });

    if (existingUser) {
      const password = existingUser.password || '';
      return NextResponse.json(
        { error: '用户已存在' },
        { status: password.length > 0 ? 412 : 413 }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        password,
      },
    });

    if (source === "github") {
      return NextResponse.json(
        { error: 'github用户已注册' },
        { status: 413 }
      );
    }

    return NextResponse.json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '注册失败，请联系管理员。' }, { status: 500 });
  }
}