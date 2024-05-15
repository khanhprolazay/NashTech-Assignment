import { ObjectType, Field } from '@nestjs/graphql';
import { Role } from './role.model';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  createdAt: Date;

  @Field()
  roleId: string;

  @Field(type => Role)
  role: Role
}
