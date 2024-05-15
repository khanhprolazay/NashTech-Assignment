import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from '../models/user.model';
import { RoleService } from '../services/role.service';
import { Role } from '../models/role.model';

@Resolver((_) => Role)
export class RoleResolver {
  constructor(private roleService: RoleService) {}

  @Query((_) => User, { name: 'role' })
  getUser(@Args('id') id: string) {
    return this.roleService.findById(id);
  }

  @Query((_) => [User], { name: 'roles' })
  getUsers() {
    return this.roleService.findAll();
  }
}
