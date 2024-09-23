// app/api/register/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../prisma/prisma';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function POST(request: Request) {
  try {
    await delay(1500);
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required.' },
        { status: 400 }
      );
    }

    // 检查用户名是否已存在
    const existingUser = await prisma.user.findFirst({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: '用户已存在导致注册失败，请联系管理员。' },
        { status: 400 }
      );
    }

    // 创建新用户
    const newUser = await prisma.user.create({
      data: {
        username,
        password,
      },
    });

    return NextResponse.json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '注册失败，请联系管理员。' }, { status: 500 });
  }
}