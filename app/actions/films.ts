'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function addFilm(formData: FormData) {
  const title = formData.get('title') as string;
  const subtitle = formData.get('subtitle') as string;
  let thumbnail = formData.get('thumbnail') as string;
  
  // Automatically convert standard YouTube or Google Drive links into embed links
  let videoUrl = formData.get('videoUrl') as string;
  let autoThumbnail = '';
  const ytMatch = videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
  
  if (ytMatch && ytMatch[1]) {
    videoUrl = `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;
    autoThumbnail = `https://img.youtube.com/vi/${ytMatch[1]}/maxresdefault.jpg`;
  } else {
    const driveMatch = videoUrl.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (driveMatch && driveMatch[1]) {
      videoUrl = `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
      // Google Drive hidden thumbnail endpoint
      autoThumbnail = `https://drive.google.com/thumbnail?id=${driveMatch[1]}&sz=w1920-h1080`;
    }
  }

  const order = parseInt(formData.get('order') as string) || 0;
  const imageFile = formData.get('imageFile') as File | null;

  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const { v2: cloudinary } = await import('cloudinary');
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'films' },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(new Error(`Cloudinary upload error: ${error.message}`));
          } else {
            resolve(result);
          }
        }
      ).end(buffer);
    });

    thumbnail = uploadResult.secure_url;
  }

  // If no image uploaded and no manual thumbnail URL provided,
  // automatically use the generated thumbnail from YouTube or Google Drive
  if ((!imageFile || imageFile.size === 0) && !thumbnail && autoThumbnail) {
    thumbnail = autoThumbnail;
  }

  await prisma.film.create({
    data: { title, subtitle, thumbnail, videoUrl, order }
  });

  revalidatePath('/admin/films');
  revalidatePath('/');
}

export async function deleteFilm(formData: FormData) {
  const id = formData.get('id') as string;
  await prisma.film.delete({ where: { id } });
  revalidatePath('/admin/films');
  revalidatePath('/');
}
