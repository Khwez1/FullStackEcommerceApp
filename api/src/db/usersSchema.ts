import {
  integer,
  pgTable,
  varchar,
  text,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 225 }).notNull(),
  role: varchar({ length: 255 }).notNull().default('user'),
  address: text()
});
