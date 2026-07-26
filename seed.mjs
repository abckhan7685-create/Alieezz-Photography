import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PORTFOLIO_ITEMS = [
  {
    imageUrl: '/portfolio-wedding.jpg',
    category: 'Couples',
    title: 'Ethereal Unions',
    description: 'Royal celebration at Alieezz Estate.',
    order: 1
  },
  {
    imageUrl: '/portfolio-landscape.jpg',
    category: 'Cinematic',
    title: 'Golden Hour Peaks',
    description: 'Breathtaking light dancing over valleys.',
    order: 2
  },
  {
    imageUrl: '/portfolio-fashion.jpg',
    category: 'Cinematic',
    title: 'Neon Reflections',
    description: 'The raw poetry of city streets after the rain.',
    order: 3
  },
  {
    imageUrl: '/portfolio-portrait.jpg',
    category: 'Portraits',
    title: 'Silent Expressions',
    description: 'Fine art studio portrait exploring mood and form.',
    order: 4
  },
];

async function main() {
  console.log('Seeding database...');
  for (const item of PORTFOLIO_ITEMS) {
    await prisma.portfolioItem.create({ data: item });
  }
  console.log('Database seeded!');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
