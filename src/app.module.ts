import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { PermissionToRoleModule } from './permission-to-role/permission-to-role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    RolesModule,
    PermissionsModule,
    DrizzleModule,
    PermissionToRoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
