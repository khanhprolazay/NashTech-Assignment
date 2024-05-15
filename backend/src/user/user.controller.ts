import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './services/user.service';
import { ControllerContext } from 'src/core/decorator/controller-context.decorator';
import { AuthGuard } from 'src/core/guard/auth.guard';

@Controller('users')
@ControllerContext('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  async index() {
    return await this.userService.findAll();
  }
}
