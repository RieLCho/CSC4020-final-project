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
// CREATE TABLE dialogue (
//   dialogue_id SERIAL PRIMARY KEY,
//   original_index INTEGER,
//   event_name VARCHAR(255) NOT NULL REFERENCES event(name),
//   character_name VARCHAR(255) REFERENCES character(name),
//   url VARCHAR(255) NOT NULL,
//   text VARCHAR(255) NOT NULL
// );

export const CharacterTable = pgTable("character", {
  name: varchar({ length: 255 }).primaryKey(),
  school_id: integer().references(() => SchoolTable.id), // SchoolTable와 연결
  club_id: integer().references(() => ClubTable.id), // ClubTable와 연결
  favorite_count: integer().default(0),
});
// CREATE TABLE character (
//   name VARCHAR(255) PRIMARY KEY,
//   school_id INTEGER REFERENCES school(id),
//   club_id INTEGER REFERENCES club(id)
// );

export const SchoolTable = pgTable("school", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  clubs: varchar({ length: 255 }),
});
// CREATE TABLE school (
//   id SERIAL PRIMARY KEY,
//   name VARCHAR(255) NOT NULL,
//   clubs VARCHAR(255)
// );

export const ClubTable = pgTable("club", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  school_id: integer().references(() => SchoolTable.id), // SchoolTable와 연결
});
// CREATE TABLE club (
//   id SERIAL PRIMARY KEY,
//   name VARCHAR(255) NOT NULL,
//   school_id INTEGER REFERENCES school(id)
// );

export const EventTable = pgTable("event", {
  name: varchar({ length: 255 }).primaryKey(),
});
// CREATE TABLE event (
//   name VARCHAR(255) PRIMARY KEY
// );

export const UserTable = pgTable("user", {
  id: varchar({ length: 20 }).primaryKey(),
  pw: varchar({ length: 20 }).notNull(),
  name: varchar({ length: 20 }).notNull(),
  email: varchar({ length: 20 }).notNull(),
});
// CREATE TABLE user (
//   id VARCHAR(20) PRIMARY KEY,
//   pw VARCHAR(20) NOT NULL,
//   name VARCHAR(20) NOT NULL,
//   email VARCHAR(20) NOT NULL
// );

// 중간 테이블 사용 (Many-to-Many 관계)
export const UserDialogueTable = pgTable("user_dialogue", {
  user_id: varchar({ length: 20 })
    .notNull()
    .references(() => UserTable.id),
  dialogue_id: integer()
    .notNull()
    .references(() => DialogueTable.dialogue_id),
});
// CREATE TABLE user_dialogue (
//   user_id VARCHAR(20) NOT NULL REFERENCES "user"(id),
//   dialogue_id INTEGER NOT NULL REFERENCES dialogue(dialogue_id)
// );

// 중간 테이블 사용 (Many-to-Many 관계)
export const UserCharacterTable = pgTable("user_character", {
  user_id: varchar({ length: 20 })
    .notNull()
    .references(() => UserTable.id),
  character_name: varchar()
    .notNull()
    .references(() => CharacterTable.name),
});
// CREATE TABLE user_character (
//   user_id VARCHAR(20) NOT NULL REFERENCES "user"(id),
//   character_name VARCHAR(255) NOT NULL REFERENCES character(name)
// );
