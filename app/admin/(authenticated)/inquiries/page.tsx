import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import InquiriesClient from './InquiriesClient';

export default async function InquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: 'desc' }
  });

  async function updateStatus(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    const status = formData.get('status') as string;
    await prisma.inquiry.update({
      where: { id },
      data: { status }
    });
    revalidatePath('/admin/inquiries');
  }

  return <InquiriesClient inquiries={inquiries} updateStatus={updateStatus} />;
}
