import { fetch, FetchError } from "void/client";

import type { ActionFunctionArgs } from "react-router";

type FieldName = "body" | "name";

type ActionResult = { ok: true } | { errors: Partial<Record<FieldName, string>>; ok: false };

type ValidationErrorBody = {
  issues?: { issues?: { message: string; path?: unknown }[]; slot: string }[];
};

const isFieldName = (value: unknown): value is FieldName => value === "body" || value === "name";

const toText = (value: FormDataEntryValue | null) => (typeof value === "string" ? value : "");

/** Void が返すバリデーションエラーをフィールドごとのメッセージに変換する */
const toFieldErrors = (data: unknown) => {
  const errors: Partial<Record<FieldName, string>> = {};
  const slots = (data as ValidationErrorBody | null)?.issues ?? [];
  for (const slot of slots) {
    for (const issue of slot.issues ?? []) {
      const field: unknown = Array.isArray(issue.path) ? issue.path[0] : issue.path;
      if (isFieldName(field) && !errors[field]) {
        errors[field] = issue.message;
      }
    }
  }
  return errors;
};

export const homeLoader = async () => {
  const messages = await fetch("/api/messages");
  return messages;
};

export const homeAction = async ({ request }: ActionFunctionArgs): Promise<ActionResult> => {
  const formData = await request.formData();
  try {
    await fetch("/api/messages", {
      body: { body: toText(formData.get("body")), name: toText(formData.get("name")) },
      method: "POST",
    });
    return { ok: true };
  } catch (error) {
    if (error instanceof FetchError && error.status === 400) {
      return { errors: toFieldErrors(error.data), ok: false };
    }
    throw error;
  }
};
