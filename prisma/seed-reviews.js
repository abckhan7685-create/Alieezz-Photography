const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedReviews() {
  const reviews = [
    {
      clientName: 'Ahmed & Fatima',
      content: 'Alieezz Photography captured our wedding in Lahore beyond our wildest dreams. Every frame felt like a scene from a movie — the emotions, the colours, the little moments we would have missed. Truly the best in Pakistan!',
      rating: 5,
    },
    {
      clientName: 'Saad Malik',
      content: 'I needed professional portraits for my corporate profile and Alieezz delivered perfection. The lighting, the angles, and the post-processing were all world-class. Highly recommended for anyone in Islamabad!',
      rating: 5,
    },
    {
      clientName: 'Hira & Usman',
      content: 'From our nikkah ceremony to the walima, the Alieezz team was incredibly professional and creative. Our families in Karachi and overseas were blown away by the cinematic highlights reel. Worth every rupee!',
      rating: 5,
    },
    {
      clientName: 'Ayesha Khan',
      content: 'I booked Alieezz for my sister\'s mehndi event and the photos turned out absolutely stunning. They knew exactly how to capture the desi vibe with a modern touch. Cannot wait to book them again for my own wedding!',
      rating: 5,
    },
    {
      clientName: 'Bilal & Zainab',
      content: 'We were nervous about choosing a photographer for our destination wedding in Hunza, but Alieezz made the entire experience seamless. The drone shots with the mountains in the background were breathtaking. True perfectionists!',
      rating: 5,
    },
    {
      clientName: 'Maham Tariq',
      content: 'Got a family portrait session done at home and the results were so natural and beautiful. They made my parents feel completely comfortable in front of the camera. The team is humble, talented, and delivers on time.',
      rating: 4,
    },
  ];

  for (const review of reviews) {
    await prisma.review.create({ data: review });
  }

  console.log(`✅ Successfully seeded ${reviews.length} reviews!`);
}

seedReviews()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
