'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function submitInquiry(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const shootType = formData.get('shootType') as string;
    const date = formData.get('date') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !shootType || !date || !message) {
      return { error: 'All fields are required.' };
    }

    await prisma.inquiry.create({
      data: { name, email, shootType, date, message }
    });

    revalidatePath('/admin/inquiries');
    return { success: true };
  } catch (error) {
    console.error('Failed to submit inquiry:', error);
    return { error: 'Failed to submit your inquiry. Please try again later.' };
  }
}
