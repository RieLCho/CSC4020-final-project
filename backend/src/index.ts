import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { DialogueTable } from "./db/schema";
import * as fs from "fs";

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  const data = JSON.parse(fs.readFileSync("./output.json", "utf-8"));

  for (const item of data) {
    const dialogue = {
      original_index: item.original_index,
      event_name: item.event_name,
      character_name: item.character_name,
      url: item.url,
      text: item.text,
    };

    await db.insert(DialogueTable).values(dialogue);
  }

  console.log("All dialogues have been inserted into the database!");
}

main();
