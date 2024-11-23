import express from "express";
import { drizzle } from "drizzle-orm/node-postgres";
import cors from "cors";
import { Pool } from "pg";
import {
  DialogueTable,
  CharacterTable,
  SchoolTable,
  ClubTable,
  UserTable,
  UserCharacterTable,
  UserDialogueTable,
} from "./db/schema";
import { count, ilike, eq, and, desc } from "drizzle-orm";

const app = express();
const port = 3000;

// 데이터베이스 연결
const pool = new Pool({
  connectionString: "postgres://postgres:3942@localhost:5432/postgres", // .env 파일에서 DATABASE_URL 가져오기
  password: "3942",
  database: "postgres",
  host: "localhost",
  user: "postgres",
});
const db = drizzle(pool);
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// API Endpoint: Search dialogues
app.post("/blue_archive/search", async (req, res) => {
  const { query, page = 1, size = 9 } = req.body;

  try {
    // 페이지네이션 계산
    const offset = (page - 1) * size;

    // 검색 쿼리 실행
    const data = await db
      .select()
      .from(DialogueTable)
      .where(ilike(DialogueTable.text, `%${query}%`)) // ILIKE는 대소문자 무시
      .limit(size)
      .offset(offset);

    // 전체 데이터 수 가져오기
    const totalElements = await db
      .select({ count: count() })
      .from(DialogueTable)
      .where(ilike(DialogueTable.text, `%${query}%`))
      .execute();

    const totalPage = Math.ceil(Number(totalElements[0].count) / size);

    console.log("totalElements:", totalElements);

    // 응답
    res.json({
      total_page: totalPage,
      total_elements: totalElements[0].count,
      data,
    });
  } catch (error) {
    console.error("Error in search API:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 학생 목록 API 엔드포인트
app.get("/students", async (req, res) => {
  try {
    const data = await db
      .select({
        name: CharacterTable.name,
        school_name: SchoolTable.name,
        club_name: ClubTable.name,
        favorite_count: CharacterTable.favorite_count,
      })
      .from(CharacterTable)
      .leftJoin(SchoolTable, eq(CharacterTable.school_id, SchoolTable.id))
      .leftJoin(ClubTable, eq(CharacterTable.club_id, ClubTable.id))
      .orderBy(desc(CharacterTable.favorite_count));
    res.json(data);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/students/detail", async (req, res) => {
  const { name, page = 1, size = 9 } = req.query;

  try {
    const offset = (Number(page) - 1) * Number(size);

    const dialogues = await db
      .select()
      .from(DialogueTable)
      .where(eq(DialogueTable.character_name, name as string))
      .limit(Number(size))
      .offset(offset);

    const totalElements = await db
      .select({ count: count() })
      .from(DialogueTable)
      .where(eq(DialogueTable.character_name, name as string))
      .execute();

    const totalPages = Math.ceil(Number(totalElements[0].count) / Number(size));

    res.json({
      frames: dialogues,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching student dialogues:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/blue_archive/:uid", async (req: any, res: any) => {
  const { uid } = req.params;

  try {
    const dialogue = await db
      .select()
      .from(DialogueTable)
      .where(eq(DialogueTable.dialogue_id, Number(uid)))
      .limit(1);

    if (dialogue.length === 0) {
      return res.status(404).json({ message: "Dialogue not found" });
    }

    res.json(dialogue[0]);
  } catch (error) {
    console.error("Error in get dialogue API:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 로그인 API 엔드포인트
app.post("/login", async (req: any, res: any) => {
  const { id, pw } = req.body;

  try {
    const user = await db
      .select()
      .from(UserTable)
      .where(and(eq(UserTable.id, id), eq(UserTable.pw, pw)))
      .limit(1);

    if (user.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ name: user[0].name });
  } catch (error) {
    console.error("Error in login API:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 회원가입 API 엔드포인트
app.post("/signup", async (req, res) => {
  const { id, pw, name, email } = req.body;

  try {
    await db.insert(UserTable).values({ id, pw, name, email });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error in sign up API:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 좋아요 API: 캐릭터 (중복 방지 추가)
app.post("/like/character", async (req: any, res: any) => {
  const { character_name, userId } = req.body; // 사용자 ID 로직에 맞게 수정

  try {
    // 중복 좋아요 확인
    const existing = await db
      .select()
      .from(UserCharacterTable)
      .where(
        and(
          eq(UserCharacterTable.user_id, userId),
          eq(UserCharacterTable.character_name, character_name)
        )
      )
      .execute();

    if (existing.length > 0) {
      return res.status(400).json({ message: "이미 좋아요를 누르셨습니다." });
    }

    await db
      .insert(UserCharacterTable)
      .values({ user_id: userId, character_name });
    res.status(200).json({ message: "Character liked successfully" });
  } catch (error) {
    console.error("Error in like character API:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 좋아요 API: 대화 (중복 방지 추가)
app.post("/like/dialogue", async (req: any, res: any) => {
  const { dialogue_id, userId } = req.body;

  try {
    // 중복 좋아요 확인
    const existing = await db
      .select()
      .from(UserDialogueTable)
      .where(
        and(
          eq(UserDialogueTable.user_id, userId),
          eq(UserDialogueTable.dialogue_id, Number(dialogue_id))
        )
      )
      .execute();

    if (existing.length > 0) {
      return res.status(400).json({ message: "이미 좋아요를 누르셨습니다." });
    }

    await db
      .insert(UserDialogueTable)
      .values({ user_id: userId, dialogue_id: Number(dialogue_id) });
    res.status(200).json({ message: "Dialogue liked successfully" });
  } catch (error) {
    console.error("Error in like dialogue API:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 좋아요 취소 API: 캐릭터
app.delete("/unlike/character", async (req: any, res: any) => {
  const { character_name, userId } = req.body;

  try {
    const result = await db
      .delete(UserCharacterTable)
      .where(
        and(
          eq(UserCharacterTable.user_id, userId),
          eq(UserCharacterTable.character_name, character_name)
        )
      )
      .execute();

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "좋아요 기록을 찾을 수 없습니다." });
    }

    res.status(200).json({ message: "Character unliked successfully" });
  } catch (error) {
    console.error("Error in unlike character API:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 좋아요 취소 API: 대화
app.delete("/unlike/dialogue", async (req: any, res: any) => {
  const { dialogue_id, userId } = req.body;

  try {
    const result = await db
      .delete(UserDialogueTable)
      .where(
        and(
          eq(UserDialogueTable.user_id, userId),
          eq(UserDialogueTable.dialogue_id, Number(dialogue_id))
        )
      )
      .execute();

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "좋아요 기록을 찾을 수 없습니다." });
    }

    res.status(200).json({ message: "Dialogue unliked successfully" });
  } catch (error) {
    console.error("Error in unlike dialogue API:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`API server is running on http://localhost:${port}`);
});
