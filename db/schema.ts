import { sql } from "void/db";
import { createInsertSchema } from "void/drizzle-zod";
import { integer, sqliteTable, text } from "void/schema-d1";

export const messages = sqliteTable("messages", {
  body: text("body").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(datetime('now'))`),
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
});

export const insertMessageSchema = createInsertSchema(messages, {
  body: (schema) =>
    schema
      .trim()
      .min(1, "メッセージを入力してください")
      .max(500, "メッセージは500文字以内で入力してください"),
  name: (schema) =>
    schema.trim().min(1, "名前を入力してください").max(50, "名前は50文字以内で入力してください"),
}).pick({ body: true, name: true });
