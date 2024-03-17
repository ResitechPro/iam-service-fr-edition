import { Inject, Injectable } from '@nestjs/common';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
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
    return await this.db.select().from(schema.roles);
  }

  async findOne(id: string) {
    return await this.db
      .select()
      .from(schema.roles)
      .where(eq(schema.roles.id, id));
  }

  async update(id: string, updateRoleDto: Partial<InferInsertModel<typeof schema.roles>>) {
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
