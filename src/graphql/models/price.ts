import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Price {
  @Field()
  id: number;

  @Field()
  min: number;

  @Field()
  med: number;

  @Field()
  max: number;

  @Field()
  createdAt: Date;
}
