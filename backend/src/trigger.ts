import { Pool } from "pg";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";

const maskNameTrigger = async (
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
