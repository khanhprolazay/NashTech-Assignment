import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { RoleService } from './services/role.service';
import { UserResolver } from './resolver/user.resolver';
import { RoleResolver } from './resolver/role.resolver';

@Module({
  providers: [UserService, RoleService, UserResolver, RoleResolver],
  exports: [UserService, RoleService],
})
export class UserModule {}
