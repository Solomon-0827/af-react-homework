import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/prisma/prisma'; 
import { NextResponse } from 'next/server';


export const GET = async () => {
    
    const users = await prisma.user.findMany();

    
    return NextResponse.json(users);

}