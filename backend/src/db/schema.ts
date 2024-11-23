import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const DialogueTable = pgTable("dialogue", {
  dialogue_id: integer().primaryKey().generatedAlwaysAsIdentity(),
  original_index: integer(),
  event_name: varchar({ length: 255 })
    .notNull()
    .references(() => EventTable.name), // EventTable와 연결
  character_name: varchar({ length: 255 }).references(
    () => CharacterTable.name
  ), // CharacterTable와 연결
  url: varchar({ length: 255 }).notNull(),
  text: varchar({ length: 255 }).notNull(),
});

export const CharacterTable = pgTable("character", {
  name: varchar({ length: 255 }).primaryKey(),
  school_id: integer().references(() => SchoolTable.id), // SchoolTable와 연결
  club_id: integer().references(() => ClubTable.id), // ClubTable와 연결
});

export const SchoolTable = pgTable("school", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  clubs: varchar({ length: 255 }),
});

export const ClubTable = pgTable("club", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  school_id: integer().references(() => SchoolTable.id), // SchoolTable와 연결
});

export const EventTable = pgTable("event", {
  name: varchar({ length: 255 }).primaryKey(),
});

// export const UserTable = pgTable("user", {
//   id: varchar({ length: 20 }).primaryKey(),
//   pw: varchar({ length: 20 }).notNull(),
//   name: varchar({ length: 20 }).notNull(),
//   email: varchar({ length: 20 }).notNull(),
// });

// export const UserDetailTable = pgTable("user_detail", {
//   userId: varchar({ length: 20 })
//     .primaryKey()
//     .references(() => UserTable.id), // UserTable와 연결
//   favDialouges: integer()
//     .array()
//     .references(() => DialogueTable.dialogue_id), // DialogueTable와 연결
//   favCharacters: integer()
//     .array()
//     .references(() => CharacterTable.id), // CharacterTable와 연결
// });
