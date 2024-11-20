import { Pool } from "pg";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";

const getCharacterDetailsProcedure = async (
  db: NodePgDatabase<Record<string, never>> & {
    $client: Pool;
  }
) => {
  await db.execute(
    `
    CREATE OR REPLACE FUNCTION get_character_details(characterId INT)
    RETURNS TABLE (
      name VARCHAR,
      age INT,
      height INT,
      birthday VARCHAR,
      hobby VARCHAR,
      cv VARCHAR,
      illustrator VARCHAR,
      attack INT,
      defense INT,
      hp INT
    ) AS $$
    BEGIN
      RETURN QUERY
      SELECT 
        c.name, ci.age, ci.height, ci.birthday, ci.hobby, ci.cv, ci.illustrator,
        cs.attack, cs.defense, cs.hp
      FROM character c
      JOIN character_info ci ON c.id = ci.character_id
      JOIN character_stat cs ON c.id = cs.character_id
      WHERE c.id = characterId;
    END;
    $$ LANGUAGE plpgsql;
  `
  );
};

/*
const characterId = 1;

const characterDetails = await db.execute(
  sql`
  SELECT * FROM get_character_details(${characterId});
`
);

console.log(characterDetails);

*/
