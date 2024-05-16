import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductInfo {
  @Field()
  id: number;

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
}
