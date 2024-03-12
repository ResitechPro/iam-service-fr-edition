import { DrizzlePostgresModule } from '@knaadh/nestjs-drizzle-postgres';
import { Module } from '@nestjs/common';
import * as schemas from '../drizzle/schema';

@Module({
  imports: [
    DrizzlePostgresModule.register({
      tag: 'DB_DEV',
      postgres: {
        url: process.env.DATABASE_URL,
      },
      config: { schema: { ...schemas } },
    }),
  ],
})
export class DrizzleModule {}
