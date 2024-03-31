import { Inject, Injectable } from '@nestjs/common';
import { DrizzleAsyncProvider } from '../drizzle/drizzle.provider';
import { InferInsertModel, eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schema';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: NodePgDatabase<typeof schema>,
  ) {}

  async create(createUserDto: InferInsertModel<typeof schema.users>) {
    return await this.db.insert(schema.users).values(createUserDto).returning();
  }

  async findAll() {
    return await this.db.select().from(schema.users);
  }

  async findOne(id: string) {
    return await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id));
  }

  async update(
    id: string,
    updateUserDto: Partial<InferInsertModel<typeof schema.users>>,
  ) {
    return await this.db
      .update(schema.users)
      .set(updateUserDto)
      .where(eq(schema.users.id, id))
      .returning();
  }

  async remove(id: string) {
    return await this.db
      .delete(schema.users)
      .where(eq(schema.users.id, id))
      .returning();
  }
}
