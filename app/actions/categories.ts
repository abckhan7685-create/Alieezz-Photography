'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function addCategory(formData: FormData) {
  const name = formData.get('name') as string;
  const order = parseInt(formData.get('order') as string) || 0;

  if (!name?.trim()) return;

  await prisma.category.create({
    data: { name: name.trim(), order }
  });

  revalidatePath('/admin/portfolio');
  revalidatePath('/');
}

export async function deleteCategory(formData: FormData) {
  const id = formData.get('id') as string;
  await prisma.category.delete({ where: { id } });
  revalidatePath('/admin/portfolio');
  revalidatePath('/');
}
