import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import fetch from 'node-fetch';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ScraperService implements OnModuleInit {
  private readonly logger = new Logger(ScraperService.name);
  private readonly urls = [
    'http://85.31.60.80:26500/search?text=notebook',
    'http://85.31.60.80:26500/search?text=amazfit%20gts%204',
    'http://85.31.60.80:26500/search?text=iphone%2014',
  ];

  constructor(
    private readonly prisma: PrismaService,
    private schedulerRegistry: SchedulerRegistry
  ) {}

  onModuleInit() {
    const cronInterval = process.env.CRON_INTERVAL || '30';
    const job = new CronJob(`*/${cronInterval} * * * *`, () => {
      this.handleCron();
    });

    this.schedulerRegistry.addCronJob('scraperJob', job);
    job.start();
    this.logger.debug(`Scraper job scheduled to run every ${cronInterval} minutes.`);
  }

  async handleCron() {
    this.logger.debug('Running the scheduled task for scraping product data.');
    
    for (const url of this.urls) {
      try {
        this.logger.debug(`Fetching data from URL: ${url}`);
        const response = await this.fetchWithTimeout(url, 10000);
        if (!response.ok) {
          throw new Error(`Failed to fetch data from ${url}: ${response.statusText}`);
        }

        const data = await response.json();
        this.logger.debug(`Data fetched successfully from ${url}`);
        await this.processData(data);
      } catch (error) {
        this.logger.error(`Error scraping data from ${url}: ${error.message}`);
      }
    }
  }

  async fetchWithTimeout(resource: string, options: any = {}) {
    const { timeout = 8000 } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  }

  async processData(data: any) {
    this.logger.debug(`Processing data: ${JSON.stringify(data)}`);
    const { title, prices, products } = data.data;

    const existingProduct = await this.prisma.product.findUnique({
      where: { title },
    });

    if (existingProduct) {
      await this.prisma.price.create({
      data: {
          min: prices.min,
          max: prices.med,
          med: prices.max,
          createdAt: new Date(),
          productId: existingProduct.id
      }
    })
  } else {
      await this.prisma.product.create({
        data: {
          title,
          imageUrl: products[0].image_url,
          prices: {
            create: {
              min: prices.min,
              med: prices.med,
              max: prices.max,
            },
          },
          productInfo: {
            create: products.map(product => ({
              imageUrl: product.image_url,
              price: product.price,
              rating: product.rating,
              scrapedFromUrl: product.scraped_from_url,
              seller: product.seller,
              sellerUrl: product.seller_url,
              title: product.title,
            })),
          },
        },
      });
    }

    this.logger.debug(`Processed product data for ${title}`);
  }
}
