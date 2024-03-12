import { integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  username: varchar('username').notNull().unique(),
  password: varchar('password').notNull(),
  roleId: integer('role_id')
    .notNull()
    .references(() => roles.id, { onDelete: 'cascade' }),
});

export const roles = pgTable('roles', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  name: varchar('name').notNull().unique(),
});

export const permissions = pgTable('permissions', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  resource: varchar('resource').notNull().unique(),
  action: varchar('action').notNull(),
});

export const rolePermissions = pgTable('role_permissions', {
  roleId: integer('role_id')
    .notNull()
    .references(() => roles.id, { onDelete: 'cascade' }),
  permissionId: integer('permission_id')
    .notNull()
    .references(() => permissions.id, { onDelete: 'cascade' }),
});
