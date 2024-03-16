import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

export const DrizzleAsyncProvider = 'drizzleProvider';

export const drizzleProvider = [
  {
    provide: DrizzleAsyncProvider,
    useFactory: async (configService: ConfigService) => {
      try {
        const databaseUrl = configService.get<string>('DATABASE_URL');

        const pool = new Pool({
          connectionString: databaseUrl,
          ssl: true,
        });
        const db = drizzle(pool);

        await migrate(db, {
          migrationsFolder: './migrations',
        });

        return db;
      } catch (error) {
        console.log('Error connecting to database', error);
      }
    },
    inject: [ConfigService],
    exports: [DrizzleAsyncProvider],
  },
];
