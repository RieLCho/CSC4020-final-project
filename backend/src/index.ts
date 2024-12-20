import "dotenv/config";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import {
  DialogueTable,
  SchoolTable,
  ClubTable,
  CharacterTable,
  EventTable,
  UserTable,
} from "./db/schema";
import * as fs from "fs";
import { maskNameTrigger, update_favorite_count } from "./trigger";
import { favorite_count } from "./procedure";
import * as cliProgress from "cli-progress";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db: NodePgDatabase & { $client: Pool } = drizzle(
  pool
) as NodePgDatabase & { $client: Pool };

async function main() {
  // 학교 데이터 삽입
  const schoolData = JSON.parse(fs.readFileSync("./json/school.json", "utf-8"));
  const schoolBar = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  );
  schoolBar.start(schoolData.length, 0);
  for (const school of schoolData) {
    await db.insert(SchoolTable).values({
      name: school.name,
      clubs: school.clubs,
    });
    schoolBar.increment();
  }
  schoolBar.stop();
  console.log("Schools have been inserted!");

  // 클럽 데이터 삽입
  const clubData = JSON.parse(fs.readFileSync("./json/club.json", "utf-8"));
  const clubBar = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  );
  clubBar.start(clubData.length, 0);
  for (const club of clubData) {
    await db.insert(ClubTable).values({
      name: club.name,
      school_id: club.school_id,
    });
    clubBar.increment();
  }
  clubBar.stop();
  console.log("Clubs have been inserted!");

  // 이벤트 데이터 삽입
  const eventData = JSON.parse(fs.readFileSync("./json/event.json", "utf-8"));
  const eventBar = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  );
  eventBar.start(eventData.length, 0);
  for (const event of eventData) {
    await db.insert(EventTable).values({
      name: event.name,
    });
    eventBar.increment();
  }
  eventBar.stop();
  console.log("Events have been inserted!");

  // 캐릭터 데이터 삽입
  const characterData = JSON.parse(
    fs.readFileSync("./json/character.json", "utf-8")
  );
  const characterBar = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  );
  characterBar.start(characterData.length, 0);
  for (const character of characterData) {
    await db.insert(CharacterTable).values({
      name: character.name,
      school_id: character.school_id,
      club_id: character.club_id,
    });
    characterBar.increment();
  }
  characterBar.stop();
  console.log("Characters have been inserted!");

  // 대사 데이터 삽입
  const dialogueData = JSON.parse(fs.readFileSync("./output.json", "utf-8"));
  const dialogueBar = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  );
  dialogueBar.start(dialogueData.length, 0);
  for (const item of dialogueData) {
    await db.insert(DialogueTable).values({
      original_index: item.original_index,
      event_name: item.event_name,
      character_name: item.character_name,
      url: item.url,
      text: item.text,
    });
    dialogueBar.increment();
  }
  dialogueBar.stop();
  console.log("Dialogues have been inserted!");

  // 계정 데이터 삽입
  const userData = JSON.parse(fs.readFileSync("./json/userInfo.json", "utf-8"));
  const userBar = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  );
  userBar.start(userData.length, 0);
  for (const user of userData) {
    await db.insert(UserTable).values({
      id: user.id,
      pw: user.pw,
      name: user.name,
      email: user.email,
    });
    userBar.increment();
  }
  userBar.stop();
  console.log("Users have been inserted!");

  // 트리거 및 프로시저 설정
  await maskNameTrigger(db);
  await favorite_count(db);
  await update_favorite_count(db);
  console.log("Triggers and procedures have been set!");
}

main();
