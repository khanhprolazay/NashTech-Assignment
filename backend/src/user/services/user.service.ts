import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/core/service/prisma.service';
import { BaseService } from 'src/core/service/base.service';
import { RoleService } from './role.service';
import { Role } from '../../core/constant/user.constant';
import { EditUserDto } from '../dto/edit-user.dto';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    protected readonly roleService: RoleService,
    protected readonly client: PrismaService,
  ) {
    super(client);
  }

  model() {
    return this.client.user;
  }

  override async findById(id: string) {
    return this.model().findFirst({
      where: { id: id },
      include: { role: true },
    });
  }

  override async create(data: Pick<User, 'id' | 'name' | 'email'>) {
    const role = await this.roleService.findFirstByName(Role.User);
    const user = await this.model().create({
      data: { ...data, role: { connect: { id: role.id } } },
      include: { role: true },
    });
    return user;
  }

  editUser(dto: EditUserDto) {
    return this.model().update({
      where: { id: dto.id },
      data: { name: dto.name },
    });
  }
}
