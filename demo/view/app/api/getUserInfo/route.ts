import jwt from 'jsonwebtoken';
import { prisma } from '@/prisma/prisma';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

const SECRET_TOKEN = process.env.SECRET_TOKEN || '';

export const GET = async () => {
  
  const token = headers().get('token');
  if (!token) {
    return NextResponse.json({ message: 'Token is required' });
  }

  try {
    
    const decoded = jwt.verify(token, SECRET_TOKEN) as jwt.JwtPayload;

    const username = decoded.username as string;

    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
      select: {
        id: true,
        username: true,
      },
    });

    if (user) {
      
      return NextResponse.json(user);
    } else {
      
      return NextResponse.json('failed');
    }
  } catch (error) {
    console.error('Error verifying token or finding user:', error);
    
    return NextResponse.json('failed');
  }
}