import { Header } from '@/components/Header/Header';
import { ScrollCamera } from '@/components/ScrollCamera/ScrollCamera';
import { ScrollCanvas } from '@/components/ScrollCanvas/ScrollCanvas';
import { Carousel } from '@/components/Carousel/Carousel';
import { CinematicReel } from '@/components/CinematicReel/CinematicReel';
import { About } from '@/components/About/About';
import { Founder } from '@/components/Founder/Founder';
import { Reviews } from '@/components/Reviews/Reviews';
import { Contact } from '@/components/Contact/Contact';
import { Footer } from '@/components/Footer/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton/WhatsAppButton';
import prisma from '@/lib/prisma';
import { getSiteSettings } from '@/app/actions/settings';

export default async function Home() {
  const portfolioItems = await prisma.portfolioItem.findMany({
    orderBy: { order: 'asc' }
  });

  const reviews = await prisma.review.findMany({
    where: { isVisible: true },
    orderBy: { createdAt: 'desc' }
  });

  const films = await prisma.film.findMany({
    orderBy: { order: 'asc' }
  });

  const categories = await prisma.category.findMany({
    orderBy: { order: 'asc' }
  });

  const settings = await getSiteSettings();

  return (
    <main>
      <Header />
      <WhatsAppButton phoneNumber={settings.phoneNumber} />
      <ScrollCamera />
      <ScrollCanvas />
      <Carousel items={portfolioItems} categories={categories.map(c => c.name)} />
      <CinematicReel films={films} />
      <About />
      <Founder />
      <Reviews reviews={reviews} />
      <Contact />
      <Footer
        location={settings.location}
        locationUrl={settings.locationUrl}
        instagramUrl={settings.instagramUrl}
        facebookUrl={settings.facebookUrl}
        youtubeUrl={settings.youtubeUrl}
      />
    </main>
  );
}
