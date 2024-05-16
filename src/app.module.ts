import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductResolver } from './graphql/resolvers/productResolver';
import { PriceResolver } from './graphql/resolvers/priceResolver';
import { ProductInfoResolver } from './graphql/resolvers/productInfoResolver';
import { PrismaService } from './prisma/prisma.service';
import { ScraperService } from './scraper/scraper.service';
import { join } from 'path';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, ProductResolver, PriceResolver, ProductInfoResolver, ScraperService],
})
export class AppModule {}
