import { ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { OAuthService } from '../oauth/services/oauth.service';
import { BaseGuard } from './base.guard';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard extends BaseGuard {
  constructor(
    protected refrector: Reflector,
    protected userService: UserService,
    protected oauthService: OAuthService,
  ) {
    super(refrector);
  }

  async canActivate(context: ExecutionContext) {
    try {
      // Get token from request header and verify
      const request = this.getRequest(context);
      const { authorization } = request.headers;
      const token = authorization.split(' ')[1];
      const valid = await this.oauthService.verify(token);
      if (!valid) throw new HttpException('Unauthorized', 401);

      // Get user information and create user if not exists
      const information = await this.oauthService.getInformation(token);
      let user = await this.userService.findById(information.sub);
      if (!user)
        user = await this.userService.create({
          id: information.sub,
          name: information.name,
          email: information.email,
        });

      // Attach user to request object
      request.user = user;
      return true;
    } catch (error) {
      throw new HttpException('Unauthorized', 401);
    }
  }
}
