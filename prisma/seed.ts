import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      { title: 'iPhone 14' },
      { title: 'Notebook Samsung Galaxy Book2' },
      { title: 'Smartwatch Amazfit Gts 4' },
    ],
  });

  const iPhone = await prisma.product.findFirst({ where: { title: 'iPhone 14' } });
  const notebook = await prisma.product.findFirst({ where: { title: 'Notebook Samsung Galaxy Book2' } });
  const amazfit = await prisma.product.findFirst({ where: { title: 'Smartwatch Amazfit Gts 4' } });

  await prisma.productDetail.createMany({
    data: [
      {
        productId: iPhone.id,
        image_url: 'https://example.com/iphone14.png',
        price: 6999.99,
        rating: 4.5,
        scraped_from_url: 'https://example.com',
        seller: 'Loja Apple',
        seller_url: 'https://example.com/apple-store',
        title: 'iPhone 14 na Apple Store'
      },
      {
        productId: notebook.id,
        image_url: 'https://example.com/galaxybook2.png',
        price: 4999.99,
        rating: 4.0,
        scraped_from_url: 'https://example.com',
        seller: 'Loja Samsung',
        seller_url: 'https://example.com/samsung-store',
        title: 'Notebook Samsung Galaxy Book2 na Samsung Store'
      },
      {
        productId: amazfit.id,
        image_url: 'https://example.com/amazfitgts4.png',
        price: 1299.99,
        rating: 4.2,
        scraped_from_url: 'https://example.com',
        seller: 'Loja Amazfit',
        seller_url: 'https://example.com/amazfit-store',
        title: 'Smartwatch Amazfit Gts 4 na Amazfit Store'
      },
    ],
  });

  // Adicionar preços iniciais para os produtos
  await prisma.price.createMany({
    data: [
      { productId: iPhone.id, value: 6999.99 },
      { productId: notebook.id, value: 4999.99 },
      { productId: amazfit.id, value: 1299.99 },
    ],
  });

  // Atualizar os produtos com os preços
  await prisma.product.updateMany({
    where: { id: iPhone.id },
    data: { minPrice: 6999.99, medPrice: 6999.99, maxPrice: 6999.99 },
  });

  await prisma.product.updateMany({
    where: { id: notebook.id },
    data: { minPrice: 4999.99, medPrice: 4999.99, maxPrice: 4999.99 },
  });

  await prisma.product.updateMany({
    where: { id: amazfit.id },
    data: { minPrice: 1299.99, medPrice: 1299.99, maxPrice: 1299.99 },
  });
}

main()
  .then(() => console.log('Seeded database'))
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
