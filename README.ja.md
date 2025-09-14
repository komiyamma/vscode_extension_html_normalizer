
# Html Normalizer VS Code Extension (日本語)

[To English README](README.md)

[![Version](https://img.shields.io/badge/version-v0.9.10-4066ff?style=flat)](https://github.com/komiyamma/vscode_extension_html_normalizer)
[![License](https://img.shields.io/github/license/komiyamma/vscode_extension_html_normalizer.svg)](https://github.com/komiyamma/vscode_extension_html_normalizer/blob/main/LICENSE.txt)

## Html Normalizerとは？

Html Normalizerは、VS Code上でHTMLファイルのタグ抜けや構造の乱れをワンクリックで自動修正できる拡張機能です。  
閉じ忘れタグや部分的なHTMLも、まるでブラウザのように正しく補完・整理します。

## 主な特徴

- **ワンクリックでHTMLをきれいに:** 閉じタグ抜けやネストの乱れを自動修正。
- **部分的なHTMLも対応:** スニペットや一部だけのHTMLでも、余計なタグを追加せず部分的なまま整理。
- **ブラウザ互換:** ブラウザと同じ解析ロジックで、表示結果も安心。
- **DOCTYPE宣言はそのまま:** `<!DOCTYPE html>` も消えません。

## 使い方

1. VS CodeでHTMLファイルを開く
2. `Ctrl+Shift+P`（Macは`Cmd+Shift+P`）でコマンドパレットを開く
3. `HtmlNormalizer`と入力してコマンド実行
4. HTMLが自動できれいに整形されます

## こんな方におすすめ

- HTML編集でタグ抜けや構造崩れを手作業で直すのが面倒な方
- Webデザイナー、学生、開発者など、誰でも簡単に使えます

---

## Change Log

### 0.9.10

- フルHTML文書の場合 `<html>` 直後 / `<body>` 直前 / `</body>` 直後 の改行ブロックを保持
- `<script>` / `<style>` 内部の改行を変更しないため内部圧縮処理を削除
- script/style 改行保持・`<html>` 直後改行保持・柔軟な改行判定のテストを追加

### 0.9.9

- 部分HTMLは「フラグメント直列化」を既定化。入力順を保持し、`<script>`やコメントも消えず、`<html>/<head>/<body>`を付けません。
- 完全/断片判定を強化（パーサ由来の位置情報を利用し、コメント/スクリプト/スタイル内の`<html`は無視。タグの大文字小文字にも対応）。
- 脆弱な正規表現ベースの差し戻しを廃止し、DOM直列化に統一。DOCTYPEは元の内容を保持。
- テストを追加（VS Codeテスト＋高速ユニット）。コメント/スクリプト文字列/テーブル（`<tbody>`の補完）/ネストした`<a>`などをカバー。
- エラーハンドリングを追加（Output Channelへエラーメッセージを出力）。
- ドキュメント更新とパッケージングの除外設定を調整（testsや生成物を同梱しない）。

### 0.9.8

- Readmeのバッジエラーの解消

### 0.9.7

Readmeを日英両方に対応した。

### 0.9.6

!DOCUMENT TYPEタグ やHTMLタグのフォーマットが元と異なってしまっていた問題

### 0.9.5

!DOCUMENT TYPEタグ などHTMLタグより外の要素が消えていた問題の修正

### 0.9.4

カテゴリを「Formatters」に変更

### 0.9.3

マーケットプレイスへのリンクミスを修正

### 0.9.2

初版
