import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService, private httpService: HttpService) {}

  async getProducts() {
    const products = await this.prisma.product.findMany({
      include: {
        products: true,
      },
    });


    return products.map(product => ({
      data: {
        title: product.title,
        prices: {
          min: product.minPrice || 0,
          med: product.medPrice || 0,
          max: product.maxPrice || 0,
        },
        products: product.products.map(detail => ({
          image_url: detail.image_url,
          price: detail.price,
          rating: detail.rating,
          scraped_from_url: detail.scraped_from_url,
          seller: detail.seller,
          seller_url: detail.seller_url,
          title: detail.title,
        })),
      },
    }));
  }

  async getProduct(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { products: true },
    });

    if (!product) {
      return null;
    }


    return {
      data: {
        title: product.title,
        prices: {
          min: product.minPrice || 0,
          med: product.medPrice || 0,
          max: product.maxPrice || 0,
        },
        products: product.products.map(detail => ({
          image_url: detail.image_url,
          price: detail.price,
          rating: detail.rating,
          scraped_from_url: detail.scraped_from_url,
          seller: detail.seller,
          seller_url: detail.seller_url,
          title: detail.title,
        })),
      },
    };
  }

  @Cron('* * * * *') 
  async updatePrices() {
    const products = await this.prisma.product.findMany();

    for (const product of products) {
      let url = '';
      if (product.title.includes('iPhone 14')) {
        url = 'http://85.31.60.80:26500/search?text=iphone%2014';
      } else if (product.title.includes('Notebook')) {
        url = 'http://85.31.60.80:26500/search?text=notebook';
      } else if (product.title.includes('Amazfit')) {
        url = 'http://85.31.60.80:26500/search?text=amazfit%20gts%204';
      }

      try {
        console.log(`Fetching data from URL: ${url}`);
        const response = await lastValueFrom(this.httpService.get(url));
        const data = response.data;
        console.log(`Response data from URL ${url}:`, data);

        if (!data || !data.data || !data.data.prices) {
          console.error(`Invalid data format from URL: ${url}`);
          continue;
        }
        
        const prices = data.data.prices;
        console.log(`Data fetched for product ${product.title}:`, prices);

        await this.prisma.price.create({
          data: {
            productId: product.id,
            value: prices.med,
          },
        });

        await this.prisma.product.update({
          where: { id: product.id },
          data: {
            minPrice: prices.min,
            medPrice: prices.med,
            maxPrice: prices.max,
          },
        });

        for (const detail of data.data.products) {
          await this.prisma.productDetail.create({
            data: {
              productId: product.id,
              image_url: detail.image_url,
              price: detail.price,
              rating: detail.rating,
              scraped_from_url: detail.scraped_from_url,
              seller: detail.seller,
              seller_url: detail.seller_url,
              title: detail.title,
            },
          });
        }

        console.log(`Prices updated for product ${product.title}`);
      } catch (error) {
        if (error.response && error.response.status === 503) {
          console.error('Service Unavailable');
        } else {
          console.error('Error fetching data:', error.message);
        }
      }
    }
  }
}
