import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService, private httpService: HttpService) {}

  async getProducts() {
    return this.prisma.product.findMany();
  }

  @Cron('* * * * *') 
  async updatePrices() {
    const products = await this.prisma.product.findMany();

    for (const product of products) {
      let url = '';
      if (product.name.includes('iPhone 14')) {
        url = 'http://85.31.60.80:26500/search?text=iphone%2014';
      } else if (product.name.includes('Notebook')) {
        url = 'http://85.31.60.80:26500/search?text=notebook';
      } else if (product.name.includes('Amazfit')) {
        url = 'http://85.31.60.80:26500/search?text=amazfit%20gts%204';
      }

      try {
        const response = await lastValueFrom(this.httpService.get(url));
        const data = response.data;
        const prices = data.prices;

        await this.prisma.price.create({
          data: {
            productId: product.id,
            min: prices.min,
            med: prices.med,
            max: prices.max,
          },
        });
      } catch (error) {
        if (error.response && error.response.status === 503) {
          console.error('Service Unavailable');
        } else {
          console.error('Error fetching data:', error.message);
        }
      }
    }
  }
  async getProduct(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { prices: true },
    });
  }
}
