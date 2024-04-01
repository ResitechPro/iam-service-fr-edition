import { Inject, Injectable } from '@nestjs/common';
import { PermissionToRoleDto } from './dto/permission-to-role.dto';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schema';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class PermissionToRoleService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: NodePgDatabase<typeof schema>,
  ) {}

  async assignPermissionToRole(permissionToRoleDto: PermissionToRoleDto) {
    return await this.db
      .insert(schema.rolePermissions)
      .values(permissionToRoleDto)
      .returning();
  }

  async removePermissionFromRole(permissionToRoleDto: PermissionToRoleDto) {
    return await this.db
      .delete(schema.rolePermissions)
      .where(
        and(
          eq(schema.rolePermissions.roleId, permissionToRoleDto.roleId),
          eq(
            schema.rolePermissions.permissionId,
            permissionToRoleDto.permissionId,
          ),
        ),
      )
      .returning();
  }
}
