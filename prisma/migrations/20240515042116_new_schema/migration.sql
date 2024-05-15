/*
  Warnings:

  - You are about to drop the `productDetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "productDetail" DROP CONSTRAINT "productDetail_productId_fkey";

-- DropTable
DROP TABLE "productDetail";

-- CreateTable
CREATE TABLE "productdetail" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "scraped_from_url" TEXT NOT NULL,
    "seller" TEXT NOT NULL,
    "seller_url" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "productdetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "productdetail" ADD CONSTRAINT "productdetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
