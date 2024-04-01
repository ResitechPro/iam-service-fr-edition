import { Inject, Injectable } from '@nestjs/common';
import { DrizzleAsyncProvider } from '../drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schema';
import { InferInsertModel, eq } from 'drizzle-orm';

@Injectable()
export class RolesService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: NodePgDatabase<typeof schema>,
  ) {}

  async create(createRoleDto: InferInsertModel<typeof schema.roles>) {
    return await this.db.insert(schema.roles).values(createRoleDto).returning();
  }

  async findAll() {
    const roles = await this.db
      .select({
        id: schema.roles.id,
        name: schema.roles.name,
        permissions: schema.permissions,
      })
      .from(schema.roles)
      .leftJoin(
        schema.rolePermissions,
        eq(schema.roles.id, schema.rolePermissions.roleId),
      )
      .leftJoin(
        schema.permissions,
        eq(schema.rolePermissions.permissionId, schema.permissions.id),
      );

    const rolesWithPermissions = roles.reduce((acc, role) => {
      const existingRole = acc.find((r) => r.id === role.id);
      const permission = role.permissions?.id
        ? {
            id: role.permissions.id,
            resource: role.permissions.resource,
            action: role.permissions.action,
          }
        : undefined;

      if (existingRole) {
        existingRole.permissions.push(permission);
      } else {
        acc.push({
          id: role.id,
          name: role.name,
          permissions: permission ? [permission] : [],
        });
      }

      return acc;
    }, []);

    return rolesWithPermissions;
  }

  async findOne(id: string) {
    const roles = await this.db
      .select({
        id: schema.roles.id,
        name: schema.roles.name,
        permissions: schema.permissions,
      })
      .from(schema.roles)
      .where(eq(schema.roles.id, id))
      .leftJoin(
        schema.rolePermissions,
        eq(schema.roles.id, schema.rolePermissions.roleId),
      )
      .leftJoin(
        schema.permissions,
        eq(schema.rolePermissions.permissionId, schema.permissions.id),
      );

    const rolesWithPermissions = roles.reduce((acc, role) => {
      const existingRole = acc.find((r) => r.id === role.id);
      const permission = {
        id: role.permissions.id,
        resource: role.permissions.resource,
        action: role.permissions.action,
      };

      if (existingRole) {
        existingRole.permissions.push(permission);
      } else {
        acc.push({
          id: role.id,
          name: role.name,
          permissions: [permission],
        });
      }

      return acc;
    }, []);

    return rolesWithPermissions[0];
  }

  async update(
    id: string,
    updateRoleDto: Partial<InferInsertModel<typeof schema.roles>>,
  ) {
    return await this.db
      .update(schema.roles)
      .set(updateRoleDto)
      .where(eq(schema.roles.id, id))
      .returning();
  }

  async remove(id: string) {
    return await this.db
      .delete(schema.roles)
      .where(eq(schema.roles.id, id))
      .returning();
  }
}
