import { Module } from '@nestjs/common';
import { PermissionToRoleService } from './permission-to-role.service';
import { PermissionToRoleController } from './permission-to-role.controller';
import { drizzleProvider } from 'src/drizzle/drizzle.provider';

@Module({
  controllers: [PermissionToRoleController],
  providers: [...drizzleProvider, PermissionToRoleService],
})
export class PermissionToRoleModule {}
