# vite-react-template

[Vite+](https://viteplus.dev/) をツールチェーンに採用し、[Void](https://void.cloud/) で Cloudflare Workers にデプロイする React SPA テンプレートです。API、D1、KV のサンプルを含みます。

## 技術スタック

- [Vite+](https://viteplus.dev/) — Vite 8 (Rolldown) / Vitest / Oxlint / Oxfmt を同梱した統合ツールチェーン
- [Void](https://void.cloud/) — Cloudflare Workers 向けの API ルーティング・リソース管理・デプロイ
- React 19
- [React Router](https://reactrouter.com/) (Data モード)
- TypeScript
- pnpm

### 開発補助ツール

- [lefthook](https://lefthook.dev/) — git hooks (pre-commit で lint / format を自動実行)
- [knip](https://knip.dev/) — 未使用の依存・エクスポートの検出

## セットアップ

Node.js のバージョンは `package.json` の `devEngines.runtime` で固定しています。pnpm が `pnpm run` 経由のコマンドを指定バージョンの Node で実行し、未取得の場合は自動でダウンロードするため、別途バージョンマネージャーを用意する必要はありません。CI も同じフィールドを参照します。

```bash
pnpm install
pnpm run db:migrate
pnpm run dev
```

ローカルでは D1 と KV を Void がエミュレートするため、Cloudflare アカウントは不要です。

## ディレクトリ構成

| パス             | 内容                                                                                               |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| `src/`           | SPA 本体。`src/routes/` は React Router のルートで、Void の規約とは無関係                          |
| `routes/`        | Void の API ルート。ファイルパスがそのまま URL になる (`routes/api/messages.ts` → `/api/messages`) |
| `db/schema.ts`   | D1 のテーブル定義 (Drizzle)。`@schema` で import できる                                            |
| `db/migrations/` | `pnpm run db:generate` で生成するマイグレーション                                                  |
| `void.config.ts` | Void の設定                                                                                        |

### サンプル

- `GET` / `POST /api/messages` — D1 へのメッセージの読み書き。リクエストボディは `db/schema.ts` から生成した zod スキーマで検証する
- `GET` / `POST /api/views` — KV に保存した閲覧数の取得と加算

SPA からは `void/client` の `fetch` で呼び出すため、パス・メソッド・リクエストボディ・レスポンスに型が付きます。D1 や KV のバインディングは `void/db` や `void/kv` の import から推論され、デプロイ時に自動で作成されます。

## デプロイ

```bash
pnpm run deploy
```

初回はブラウザで Cloudflare にログインし、Worker・D1・KV の作成とマイグレーションの適用まで行います。main への push で自動デプロイする場合は `pnpm void init --github` でワークフローを生成し、リポジトリのシークレットに `CLOUDFLARE_API_TOKEN` を登録してください。

## コマンド

| コマンド                         | 内容                                        |
| -------------------------------- | ------------------------------------------- |
| `pnpm run dev`                   | 開発サーバーを起動 (`vp dev`)               |
| `pnpm run build`                 | プロダクションビルド (`vp build`)           |
| `pnpm run preview`               | ビルド成果物のプレビュー (`vp preview`)     |
| `pnpm run typecheck`             | 型チェック (`void prepare && tsc --noEmit`) |
| `pnpm run lint` / `lint:fix`     | Oxlint によるリント (`vp lint`)             |
| `pnpm run format` / `format:fix` | Oxfmt によるフォーマット (`vp fmt`)         |
| `pnpm run test` / `test:watch`   | Vitest によるテスト (`vp test`)             |
| `pnpm run db:generate`           | スキーマからマイグレーションを生成          |
| `pnpm run db:migrate`            | ローカルの D1 にマイグレーションを適用      |
| `pnpm run deploy`                | Cloudflare へデプロイ (`void deploy`)       |
| `pnpm run knip`                  | 未使用の依存・エクスポート検出              |
| `pnpm run codecheck`             | 上記チェックの一括実行 (CI と同等)          |

## 方針

- 依存関係のバージョンはすべて完全固定 (`^` / `~` を使わない)。`pnpm-workspace.yaml` の `saveExact: true` で強制
- リント・フォーマット・テストの設定は `vite.config.ts` に一元化 (Vite+ 流)
- パスエイリアスは `#/*` → `src/*`
- `vite` は Vite+ の catalog で `@voidzero-dev/vite-plus-core` に向ける (`vp migrate` の設定)
- Vitest の実行中は `voidPlugin` を読み込まない
