import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      { name: 'iPhone 14', imageUrl: 'https://example.com/iphone14.png' },
      { name: 'Notebook Samsung Galaxy Book2', imageUrl: 'https://example.com/galaxybook2.png' },
      { name: 'Smartwatch Amazfit Gts 4', imageUrl: 'https://example.com/amazfitgts4.png' },
    ],
  });
}

main()
  .then(() => console.log('Seeded database'))
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
