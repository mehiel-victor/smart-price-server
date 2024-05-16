import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductInfoInput {
  @Field()
  imageUrl: string;

  @Field()
  price: number;

  @Field()
  rating: number;

  @Field()
  scrapedFromUrl: string;

  @Field()
  seller: string;

  @Field()
  sellerUrl: string;

  @Field()
  title: string;

  @Field()
  productId: number;
}
