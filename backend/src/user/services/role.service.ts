import { Injectable, OnModuleInit } from '@nestjs/common';
import { Role } from '@prisma/client';
import { BaseService } from 'src/core/service/base.service';

@Injectable()
export class RoleService extends BaseService<Role> implements OnModuleInit {
  onModuleInit() {
    this.seed();
  }

  model() {
    return this.client.role;
  }

  async seed() {
    const count = await this.model().count();
    if (!count) {
      return this.model().createMany({
        data: [{ name: 'Admin' }, { name: 'User' }],
      });
    }
  }
}
