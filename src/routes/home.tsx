import { useEffect, useId, useRef } from "react";

import { Form, useActionData, useLoaderData, useNavigation } from "react-router";

import type { homeAction, homeLoader } from "#/routes/home.data";

const formatDate = (value: string) =>
  // D1 の datetime('now') は UTC の "YYYY-MM-DD HH:MM:SS" を返す
  new Date(`${value.replace(" ", "T")}Z`).toLocaleString("ja-JP");

export const Home = () => {
  const messages = useLoaderData<typeof homeLoader>();
  const result = useActionData<typeof homeAction>();
  const navigation = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);
  const id = useId();

  const isSubmitting = navigation.state === "submitting";
  const errors = result?.ok === false ? result.errors : {};

  useEffect(() => {
    if (result?.ok) {
      formRef.current?.reset();
    }
  }, [result]);

  return (
    <>
      <h1>ゲストブック</h1>

      <Form
        method="post"
        ref={formRef}
        noValidate
        onSubmit={(event) => {
          // ボタンを disabled にするとボタンからフォーカスが外れるため、送信中は aria-disabled と送信の中止で二重送信を防ぐ
          if (isSubmitting) {
            event.preventDefault();
          }
        }}
      >
        <p>
          <label htmlFor={`${id}-name`}>名前</label>
          <input
            id={`${id}-name`}
            name="name"
            // HTML 仕様と WCAG 1.3.5 で有効なトークンだが、ルールの許可リストに含まれていない
            // oxlint-disable-next-line jsx-a11y/autocomplete-valid
            autoComplete="nickname"
            maxLength={50}
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${id}-name-error` : undefined}
          />
          {errors.name && <span id={`${id}-name-error`}>{errors.name}</span>}
        </p>
        <p>
          <label htmlFor={`${id}-body`}>メッセージ</label>
          <textarea
            id={`${id}-body`}
            name="body"
            maxLength={500}
            required
            aria-invalid={errors.body ? true : undefined}
            aria-describedby={errors.body ? `${id}-body-error` : undefined}
          />
          {errors.body && <span id={`${id}-body-error`}>{errors.body}</span>}
        </p>
        <button type="submit" aria-disabled={isSubmitting}>
          送信
        </button>
        {/* スクリーンリーダーによっては output 要素の status ロールを読み上げないため、role を明示した要素を使う */}
        {/* oxlint-disable-next-line jsx-a11y/prefer-tag-over-role */}
        <p role="status">
          {isSubmitting ? "送信しています" : result?.ok ? "メッセージを送信しました" : ""}
        </p>
      </Form>

      <h2>メッセージ一覧</h2>
      {messages.length === 0 ? (
        <p>まだメッセージはありません。</p>
      ) : (
        <ul>
          {messages.map((message) => (
            <li key={message.id}>
              <p>
                <b>{message.name}</b>{" "}
                <time dateTime={`${message.createdAt.replace(" ", "T")}Z`}>
                  {formatDate(message.createdAt)}
                </time>
              </p>
              <p>{message.body}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
