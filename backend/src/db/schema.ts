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

export const UserTable = pgTable("user", {
  id: varchar({ length: 20 }).primaryKey(),
  pw: varchar({ length: 20 }).notNull(),
  name: varchar({ length: 20 }).notNull(),
  email: varchar({ length: 20 }).notNull(),
});

// 중간 테이블 사용 (Many-to-Many 관계)
export const UserDialogueTable = pgTable("user_dialogue", {
  user_id: varchar({ length: 20 })
    .notNull()
    .references(() => UserTable.id),
  dialogue_id: integer()
    .notNull()
    .references(() => DialogueTable.dialogue_id),
});

// 중간 테이블 사용 (Many-to-Many 관계)
export const UserCharacterTable = pgTable("user_character", {
  user_id: varchar({ length: 20 })
    .notNull()
    .references(() => UserTable.id),
  character_name: varchar()
    .notNull()
    .references(() => CharacterTable.name),
});
