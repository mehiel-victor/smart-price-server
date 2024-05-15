import { Resolver, Query, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Resolver(of => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(returns => [Product])
  async products() {
    return this.productService.getProducts();
  }

  @Query(returns => Product)
  async product(@Args('id') id: number) {
    return this.productService.getProduct(id);
  }
}
