[To English Version README](README.md)

# Html Normalizer

[![Version](https://img.shields.io/badge/version-v0.9.9-4066ff?style=flat)](https://github.com/komiyamma/vscode_extension_html_normalizer)
[![License](https://img.shields.io/github/license/komiyamma/vscode_extension_html_normalizer.svg)](https://github.com/komiyamma/vscode_extension_html_normalizer/blob/main/LICENSE.txt)

HTML全体のタグの閉じ忘れなどの不整合を全て自動的に修正します。
ブラウザのDOM解釈を模倣することで、正確な修正を実現します。

## 主な機能 (Features)

- **タグの自動修正:** 閉じられていないタグや、不正なネストを自動で修正します。
- **完全HTMLと断片の扱い:** 完全HTMLは再構築され、DOCTYPEも保持します。断片はフラグメントとしてパースし、`<html>/<head>/<body>` を付けずに直列化するため、順序や`<script>`・コメントなどがそのまま保たれます。
- **堅牢な判定:** コメントや`<script>`内文字列の`"<html"`に惑わされず、完全HTMLか断片かを見分けます。
- **ブラウザ互換:** 標準準拠のHTMLパーサにより高い互換性を担保します。

## 使い方 (Usage)

1. コマンドパレットを開きます (`Ctrl+Shift+P` or `Cmd+Shift+P`)
2. `HtmlNormalizer` と入力して、コマンドを実行します。
3. アクティブなHTMLファイルが正規化されます。

## マーケットプレイス (Marketplace)

[Html Normalizer - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=komiyamma.htmlnormalizer)

## 挙動メモ (Behavior Notes)

- **断片:** 入力順が維持され、要素は自動的に`<head>`へ移動しません。完全ドキュメントではブラウザが移動する場合があります。
- **テーブル:** `<tbody>`などの暗黙要素がブラウザにより補完されることがあり、シリアライズに反映されます。
- **文脈依存要素:** `<tr>` や `<li>` など親要素が必須の要素はベストエフォートで正規化しますが、ラッパーは既定では付与しません。

---

## Change Log

### 0.9.9

- 部分HTMLは「フラグメント直列化」を既定化。入力順を保持し、`<script>`やコメントも消えず、`<html>/<head>/<body>`を付けません。
- 完全/断片判定を強化（パーサ由来の位置情報を利用し、コメント/スクリプト/スタイル内の`<html`は無視。タグの大文字小文字にも対応）。
- 脆弱な正規表現ベースの差し戻しを廃止し、DOM直列化に統一。DOCTYPEは元の内容を保持。
- テストを追加（VS Codeテスト＋高速ユニット）。コメント/スクリプト文字列/テーブル（`<tbody>`の補完）/ネストした`<a>`などをカバー。
- エラーハンドリングを追加（Output Channelへエラーメッセージを出力）。
- ドキュメント更新とパッケージングの除外設定を調整（testsや生成物を同梱しない）。

### 0.9.8

- Fixed version badge error

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
