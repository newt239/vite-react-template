import { fetch } from "void/client";

/** 閲覧数をアプリの読み込み時に1回だけ増やす */
export const rootLoader = async () => {
  const result = await fetch("/api/views", { method: "POST" });
  return result;
};

/** フォーム送信後の再検証で閲覧数が増えないよう、ルートの loader は再実行しない */
export const shouldRevalidateRoot = () => false;
