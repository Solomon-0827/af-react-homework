import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma';

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

    const user = await prisma.user.findFirst({
      where: { username },
    });

    if (!user) {
      return NextResponse.json(
        { error: '用户不存在，请先注册。' },
        { status: 400 }
      );
    }

    if (user.password !== password) {
      return NextResponse.json(
        { error: '密码不正确，请重新输入。' },
        { status: 401 }
      );
    }

    return NextResponse.json({ message: '登录成功', user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '登录失败，请联系管理员。' }, { status: 500 });
  }
}