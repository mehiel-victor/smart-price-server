import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const product1 = await prisma.product.create({
    data: {
      title: 'iPhone 14',
      imageUrl: 'https://example.com/iphone14.jpg',
      prices: {
        create: {
          min: 500000,
          med: 550000,
          max: 600000,
        },
      },
      productInfo: {
        create: {
          imageUrl: 'https://example.com/iphone14.jpg',
          price: 550000,
          rating: 4.5,
          scrapedFromUrl: 'https://example.com/iphone14',
          seller: 'Example Store',
          sellerUrl: 'https://example.com/store',
          title: 'iPhone 14 - Example Store',
        },
      },
    },
  });

  const product2 = await prisma.product.create({
    data: {
      title: 'Notebook Samsung Galaxy Book2',
      imageUrl: 'https://example.com/galaxybook2.jpg',
      prices: {
        create: {
          min: 300000,
          med: 350000,
          max: 400000,
        },
      },
      productInfo: {
        create: {
          imageUrl: 'https://example.com/galaxybook2.jpg',
          price: 350000,
          rating: 4.3,
          scrapedFromUrl: 'https://example.com/galaxybook2',
          seller: 'Example Store',
          sellerUrl: 'https://example.com/store',
          title: 'Notebook Samsung Galaxy Book2 - Example Store',
        },
      },
    },
  });

  const product3 = await prisma.product.create({
    data: {
      title: 'Smartwatch Amazfit Gts 4',
      imageUrl: 'https://example.com/amazfitgts4.jpg',
      prices: {
        create: {
          min: 100000,
          med: 150000,
          max: 200000,
        },
      },
      productInfo: {
        create: {
          imageUrl: 'https://example.com/amazfitgts4.jpg',
          price: 150000,
          rating: 4.7,
          scrapedFromUrl: 'https://example.com/amazfitgts4',
          seller: 'Example Store',
          sellerUrl: 'https://example.com/store',
          title: 'Smartwatch Amazfit Gts 4 - Example Store',
        },
      },
    },
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
