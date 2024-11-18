import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const DialogueTable = pgTable("dialogue", {
  dialogue_id: integer().primaryKey().generatedAlwaysAsIdentity(),
  original_index: integer(),
  event_name: varchar({ length: 255 }).notNull(),
  character_name: varchar({ length: 255 }).notNull(),
  url: varchar({ length: 255 }).notNull(),
  text: varchar({ length: 255 }).notNull(),
});

// 캐릭터 테이블
export const CharacterTable = pgTable("character", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

// 캐릭터 정보 테이블
export const CharacterInfoTable = pgTable("character_info", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  age: integer(),
  height: integer(),
  birthday: varchar({ length: 255 }),
  hobby: varchar({ length: 255 }),
  cv: varchar({ length: 255 }),
  illustrator: varchar({ length: 255 }),
  note: varchar({ length: 255 }),
});

export const CharacterStatTable = pgTable("character_stat", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  attack: integer(),
  defense: integer(),
  hp: integer(),
});

// 학교 테이블
export const SchoolTable = pgTable("school", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  clubs: varchar({ length: 255 }),
});

// 동아리 테이블
export const ClubTable = pgTable("club", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
});
