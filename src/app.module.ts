import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { DrizzleModule } from './drizzle/drizzle.module';

@Module({
  imports: [UsersModule, RolesModule, PermissionsModule, DrizzleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
