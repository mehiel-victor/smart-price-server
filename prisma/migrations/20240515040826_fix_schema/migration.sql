/*
  Warnings:

  - You are about to drop the `product_detail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "product_detail" DROP CONSTRAINT "product_detail_productId_fkey";

-- DropTable
DROP TABLE "product_detail";

-- CreateTable
CREATE TABLE "productDetail" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "scraped_from_url" TEXT NOT NULL,
    "seller" TEXT NOT NULL,
    "seller_url" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "productDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "productDetail" ADD CONSTRAINT "productDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
