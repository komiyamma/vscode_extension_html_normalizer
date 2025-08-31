[English Version](README.md)

# Html Normalizer

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/komiyamma.htmlnormalizer.svg?color=4094ff)](https://marketplace.visualstudio.com/items?itemName=komiyamma.htmlnormalizer)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/komiyamma.htmlnormalizer.svg)](https://marketplace.visualstudio.com/items?itemName=komiyamma.htmlnormalizer)
[![License](https://img.shields.io/github/license/komiyamma/vscode_extension_html_normalizer.svg)](https://github.com/komiyamma/vscode_extension_html_normalizer/blob/main/LICENSE.txt)

HTML全体のタグの閉じ忘れなどの不整合を全て自動的に修正します。
ブラウザのDOM解釈を模倣することで、正確な修正を実現します。

## 主な機能 (Features)

- **タグの自動修正:** 閉じられていないタグや、不正なネストを自動で修正します。
- **HTML構造の正規化:** `<html>`, `<head>`, `<body>` タグがない場合でも、「部分的なHTML記述」として「部分的なまま」適切に補完します。
- **ブラウザ互換:** WebブラウザがHTMLを解釈するのと同じロジックを使用しているため、高い互換性があります。
- **DOCTYPE宣言の保持:** `<!DOCTYPE html>` のようなドキュメントタイプ宣言を維持したまま正規化します。

## 使い方 (Usage)

1. コマンドパレットを開きます (`Ctrl+Shift+P` or `Cmd+Shift+P`)
2. `HtmlNormalizer` と入力して、コマンドを実行します。
3. アクティブなHTMLファイルが正規化されます。

## マーケットプレイス (Marketplace)

[Html Normalizer - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=komiyamma.htmlnormalizer)

---

## Change Log

### 0.9.6

- !DOCUMENT TYPEタグ やHTMLタグのフォーマットが元と異なってしまっていた問題

### 0.9.5

- !DOCUMENT TYPEタグ などHTMLタグより外の要素が消えていた問題の修正

### 0.9.4

- カテゴリを「Formatters」に変更

### 0.9.3

- マーケットプレイスへのリンクミスを修正

### 0.9.2

- 初版
