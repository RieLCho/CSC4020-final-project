import { Pool } from "pg";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";

const favorite_count = async (
  db: NodePgDatabase<Record<string, never>> & {
    $client: Pool;
  }
) => {
  await db.execute(
    `
CREATE OR REPLACE FUNCTION update_favorite_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE character
    SET favorite_count = favorite_count + 1
    WHERE name = NEW.character_name;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE character
    SET favorite_count = favorite_count - 1
    WHERE name = OLD.character_name;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

  `
  );
};
