import { Pool } from "pg";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";

export const maskNameTrigger = async (
  db: NodePgDatabase<Record<string, never>> & {
    $client: Pool;
  }
) => {
  await db.execute(
    `
        CREATE OR REPLACE FUNCTION mask_user_name()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW.name = LEFT(NEW.name, 1) || '*' || RIGHT(NEW.name, 1);
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
      `
  );

  // 트리거 생성
  await db.execute(
    `
      CREATE TRIGGER mask_name_before_insert
      BEFORE INSERT OR UPDATE ON "user"
      FOR EACH ROW
      EXECUTE FUNCTION mask_user_name();
    `
  );
};

export const update_favorite_count = async (
  db: NodePgDatabase<Record<string, never>> & {
    $client: Pool;
  }
) => {
  await db.execute(
    `
    CREATE TRIGGER user_character_favorite_trigger
AFTER INSERT OR DELETE ON user_character
FOR EACH ROW
EXECUTE FUNCTION update_favorite_count();

`
  );
};
