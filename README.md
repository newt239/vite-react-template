# vite-react-template

[Vite+](https://viteplus.dev/) をツールチェーンに採用した React SPA テンプレートです。

## 技術スタック

- [Vite+](https://viteplus.dev/) — Vite 8 (Rolldown) / Vitest / Oxlint / Oxfmt を同梱した統合ツールチェーン
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
pnpm run dev
```

## コマンド

| コマンド                         | 内容                                    |
| -------------------------------- | --------------------------------------- |
| `pnpm run dev`                   | 開発サーバーを起動 (`vp dev`)           |
| `pnpm run build`                 | プロダクションビルド (`vp build`)       |
| `pnpm run preview`               | ビルド成果物のプレビュー (`vp preview`) |
| `pnpm run typecheck`             | 型チェック (`tsc --noEmit`)             |
| `pnpm run lint` / `lint:fix`     | Oxlint によるリント (`vp lint`)         |
| `pnpm run format` / `format:fix` | Oxfmt によるフォーマット (`vp fmt`)     |
| `pnpm run test` / `test:watch`   | Vitest によるテスト (`vp test`)         |
| `pnpm run knip`                  | 未使用の依存・エクスポート検出          |
| `pnpm run codecheck`             | 上記チェックの一括実行 (CI と同等)      |

## 方針

- 依存関係のバージョンはすべて完全固定 (`^` / `~` を使わない)。`pnpm-workspace.yaml` の `saveExact: true` で強制
- リント・フォーマット・テストの設定は `vite.config.ts` に一元化 (Vite+ 流)
- パスエイリアスは `#/*` → `src/*`
