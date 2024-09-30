
import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: '用户名和密码是必填项。' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: { username },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: '用户不存在，无法修改密码。' },
        { status: 404 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        password: password,
      },
    });

    return NextResponse.json({ message: '密码已成功更新', user: updatedUser });
  } catch (error) {
    console.error('更新密码时出错:', error);
    return NextResponse.json(
      { error: '服务器内部错误，请联系管理员。' },
      { status: 500 }
    );
  }
}