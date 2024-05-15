import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "./user.model";

@ObjectType()
export class Role {
  @Field(type => ID)
  id: string

  @Field()
  name: string

  @Field(type => [User])
  users: User[]
}