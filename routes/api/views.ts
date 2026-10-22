import { defineHandler } from "void";
import { kv } from "void/kv";

const VIEWS_KEY = "views:home";

/** KV に保存した閲覧数を返す */
export const GET = defineHandler(async () => ({
  views: (await kv.get<number>(VIEWS_KEY)) ?? 0,
}));

/**
 * KV の閲覧数を1増やして返す
 *
 * KV は結果整合で、読み取りと書き込みが不可分ではないため、厳密なカウントには Durable Objects を使う
 */
export const POST = defineHandler(async () => {
  const views = ((await kv.get<number>(VIEWS_KEY)) ?? 0) + 1;
  await kv.put(VIEWS_KEY, views);
  return { views };
});
