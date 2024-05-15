import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { ProductController } from './product.controller';

@Module({
  imports: [HttpModule],  
  providers: [ProductService, ProductResolver], controllers: [ProductController],
})
export class ProductModule {}
