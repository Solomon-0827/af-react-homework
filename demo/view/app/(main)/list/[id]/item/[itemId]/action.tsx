'use server';

import { prisma } from '@/prisma/prisma'; 

export const getUserItemById = async (id: number) => {
  try {
    const userItem = await prisma.user_items.findUnique({
      where: {
        id: id, 
      },
    });

    if (!userItem) {
      return { message: 'User item not found.' };
    }

    return userItem;
  } catch (error) {
    console.error('Error fetching user item:', error);
    return { message: 'Internal Server Error' };
  }
};