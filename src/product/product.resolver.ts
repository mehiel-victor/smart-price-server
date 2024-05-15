import { Resolver, Query } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Resolver(of => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(returns => [Product])
  async products() {
    return this.productService.getProducts();
  }
}
