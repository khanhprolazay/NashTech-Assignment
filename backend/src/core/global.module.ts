import { Global, Module } from '@nestjs/common';
import { LoggerService } from './service/logger.service';
import { PrismaService } from './service/prisma.service';
import { OauthModule } from './oauth/oauth.module';
import { OauthJwkOptions } from './oauth/oauth.types';

@Global()
@Module({
  imports: [
    OauthModule.forRoot<OauthJwkOptions>({
      ttl: 3600,
      openidConfigurationUrl:
        'https://dev-ynxazmvzjlsxvnho.au.auth0.com/.well-known/openid-configuration',
    }),
  ],
  providers: [LoggerService, PrismaService],
  exports: [LoggerService, PrismaService],
})
export class GlobalModule {}
