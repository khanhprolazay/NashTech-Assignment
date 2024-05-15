import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { RoleService } from '../services/role.service';
import { EditUserDto } from '../dto/edit-user.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/core/guard/roles.guard';
import { Roles } from 'src/core/decorator/roles.decorator';
import { Role } from 'src/core/constant/user.constant';
import { ControllerContext } from 'src/core/decorator/controller-context.decorator';
import { AuthGuard } from 'src/core/guard/auth.guard';

@Resolver((_) => User)
@ControllerContext('gql')
@UseGuards(AuthGuard)
export class UserResolver {
  constructor(
    private userService: UserService,
    private roleService: RoleService,
  ) {}

  @Query((_) => User)
  user(@Args('id') id: string) {
    return this.userService.findById(id);
  }

  @Query((_) => [User])
  users() {
    return this.userService.findAll();
  }

  @Roles([Role.Admin])
  @UseGuards(RolesGuard)
  @Mutation((_) => User)
  async editUser(@Args('editUserDto') editUserDto: EditUserDto) {
    return this.userService.editUser(editUserDto);
  }

  @ResolveField()
  role(@Parent() user: User) {
    return this.roleService.findById(user.roleId);
  }
}
