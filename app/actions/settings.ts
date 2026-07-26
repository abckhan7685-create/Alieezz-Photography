'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getSiteSettings() {
  // Try to find the first settings row
  let settings = await prisma.siteSettings.findFirst();

  // If no settings exist yet, create the default row
  if (!settings) {
    settings = await prisma.siteSettings.create({
      data: {
        phoneNumber: '+923347215663',
        email: 'info@alieezz.com',
        location: 'Dera Ismail Khan',
        locationUrl: 'https://maps.app.goo.gl/NGxBhAseXpgXXn5y8',
        instagramUrl: 'https://instagram.com',
        facebookUrl: 'https://facebook.com',
        youtubeUrl: 'https://youtube.com',
      }
    });
  }

  return settings;
}

export async function updateSiteSettings(formData: FormData) {
  const id = formData.get('id') as string;
  const phoneNumber = formData.get('phoneNumber') as string;
  const email = formData.get('email') as string;
  const location = formData.get('location') as string;
  const locationUrl = formData.get('locationUrl') as string;
  const instagramUrl = formData.get('instagramUrl') as string;
  const facebookUrl = formData.get('facebookUrl') as string;
  const youtubeUrl = formData.get('youtubeUrl') as string;

  await prisma.siteSettings.update({
    where: { id },
    data: {
      phoneNumber,
      email,
      location,
      locationUrl,
      instagramUrl,
      facebookUrl,
      youtubeUrl,
    }
  });

  revalidatePath('/');
  revalidatePath('/admin/settings');
}
