import { Inject, Injectable } from '@nestjs/common';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schema';
import { InferInsertModel, eq } from 'drizzle-orm';

@Injectable()
export class PermissionsService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: NodePgDatabase<typeof schema>,
  ) {}

  async create(createPermissionDto: InferInsertModel<typeof schema.permissions>) {
    return await this.db.insert(schema.permissions).values(createPermissionDto).returning();
  }

  async findAll() {
    return await this.db.select().from(schema.permissions);
  }

  async findOne(id: string) {
    return await this.db
      .select()
      .from(schema.permissions)
      .where(eq(schema.permissions.id, id));
  }

  async update(id: string, updatePermissionDto: Partial<InferInsertModel<typeof schema.permissions>>) {
    return await this.db
      .update(schema.permissions)
      .set(updatePermissionDto)
      .where(eq(schema.permissions.id, id))
      .returning();
  }

  async remove(id: string) {
    return await this.db
      .delete(schema.permissions)
      .where(eq(schema.permissions.id, id))
      .returning();
  }
}
