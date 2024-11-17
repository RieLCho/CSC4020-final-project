import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const DialogueTable = pgTable("dialogue", {
  dialogue_id: integer().primaryKey().generatedAlwaysAsIdentity(),
  original_index: integer(),
  event_name: varchar({ length: 255 }).notNull(),
  character_name: varchar({ length: 255 }).notNull(),
  url: varchar({ length: 255 }).notNull(),
  text: varchar({ length: 255 }).notNull(),
});
