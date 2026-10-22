# AGENTS.md

## コミットメッセージ

- 1行以内で簡潔に記述する(本文・フッターは付けない)
- Conventional Commits形式(`feat:`, `fix:`, `chore:` など)に従う

## Void

- API ルートは `routes/`、D1 のスキーマは `db/schema.ts` に置く。`src/routes/` は React Router のルートで、Void の規約とは関係ない
- Void の API や CLI を使う前に `node_modules/void/docs/` の該当ドキュメントを読む。導入手順は `guide/quickstart.md`、コマンドは `reference/cli.md`
- スキーマを変更したら `pnpm run db:generate` でマイグレーションを生成してコミットする
