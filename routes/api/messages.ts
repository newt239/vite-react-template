import { insertMessageSchema, messages } from "@schema";
import { defineHandler } from "void";
import { db, desc } from "void/db";

/** D1 から新しい順にメッセージを取得する */
export const GET = defineHandler(() =>
  db.select().from(messages).orderBy(desc(messages.id)).limit(50),
);

/** D1 にメッセージを1件追加する */
export const POST = defineHandler.withValidator({
  body: insertMessageSchema,
})(async (_c, { body }) => {
  const [created] = await db.insert(messages).values(body).returning();
  return created;
});
