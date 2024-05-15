import { Module } from '@nestjs/common';
import { GlobalModule } from './core/global.module';
import { UserModule } from './user/user.module';
import { RolesGuard } from './core/guard/roles.guard';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthGuard } from './core/guard/auth.guard';

@Module({
  imports: [
    GlobalModule,
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [AuthGuard, RolesGuard],
  exports: [AuthGuard, RolesGuard],
})
export class AppModule {}
