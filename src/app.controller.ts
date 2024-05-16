import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('products')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getProducts() {
    return this.appService.getProducts();
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return this.appService.getProduct(+id);
  }
}
