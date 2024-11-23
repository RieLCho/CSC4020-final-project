import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import {
  DialogueTable,
  SchoolTable,
  ClubTable,
  CharacterTable,
  EventTable,
  UserTable,
} from "./db/schema";
import * as fs from "fs";

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  // 학교 데이터 삽입
  const schoolData = JSON.parse(fs.readFileSync("./json/school.json", "utf-8"));
  for (const school of schoolData) {
    await db.insert(SchoolTable).values({
      name: school.name,
      clubs: school.clubs,
    });
  }
  console.log("Schools have been inserted!");

  // 클럽 데이터 삽입
  const clubData = JSON.parse(fs.readFileSync("./json/club.json", "utf-8"));
  for (const club of clubData) {
    await db.insert(ClubTable).values({
      name: club.name,
      school_id: club.school_id,
    });
  }
  console.log("Clubs have been inserted!");

  // 이벤트 데이터 삽입
  const eventData = JSON.parse(fs.readFileSync("./json/event.json", "utf-8"));
  for (const event of eventData) {
    await db.insert(EventTable).values({
      name: event.name,
    });
  }
  console.log("Events have been inserted!");

  // 캐릭터 데이터 삽입
  const characterData = JSON.parse(
    fs.readFileSync("./json/character.json", "utf-8")
  );
  for (const character of characterData) {
    await db.insert(CharacterTable).values({
      name: character.name,
      school_id: character.school_id,
      club_id: character.club_id,
    });
  }
  console.log("Characters have been inserted!");

  // 대사 데이터 삽입
  const dialogueData = JSON.parse(fs.readFileSync("./output.json", "utf-8"));
  for (const item of dialogueData) {
    await db.insert(DialogueTable).values({
      original_index: item.original_index,
      event_name: item.event_name,
      character_name: item.character_name,
      url: item.url,
      text: item.text,
    });
  }
  console.log("Dialogues have been inserted!");

  // 계정 데이터 삽입
  const userData = JSON.parse(fs.readFileSync("./json/user.json", "utf-8"));
  for (const user of userData) {
    await db.insert(UserTable).values({
      id: user.id,
      pw: user.pw,
      name: user.name,
      email: user.email,
    });
  }
  console.log("Users have been inserted!");
}

main();
