import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts() {
    return this.productService.getProducts();
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    const product = await this.productService.getProduct(Number(id));
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
