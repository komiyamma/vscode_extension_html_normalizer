[日本語版はこちら](README.ja.md)

# Html Normalizer

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/komiyamma.htmlnormalizer.svg?color=4094ff)](https://marketplace.visualstudio.com/items?itemName=komiyamma.htmlnormalizer)
[![License](https://img.shields.io/github/license/komiyamma/vscode_extension_html_normalizer.svg)](https://github.com/komiyamma/vscode_extension_html_normalizer/blob/main/LICENSE.txt)

This extension automatically corrects inconsistencies in your HTML, such as unclosed tags.
It mimics the browser's DOM interpretation for accurate normalization.

## Features

- **Auto-corrects tags:** Fixes unclosed tags and improper nesting automatically.
- **Normalizes HTML structure:** Even if `<html>`, `<head>`, `<body>` tags are missing, it will be properly completed as "partial HTML description" and "keep it partial".
- **Browser-compatible:** Uses the same logic as web browsers to parse HTML, ensuring high compatibility.
- **Preserves DOCTYPE:** Keeps the `<!DOCTYPE html>` declaration intact during normalization.

## Usage

1. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`).
2. Type `HtmlNormalizer` and run the command.
3. The active HTML file will be normalized.

## Marketplace

[Html Normalizer - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=komiyamma.htmlnormalizer)

---

## Change Log

### 0.9.7

- The Readme is now available in both English and Japanese.

### 0.9.6

- Fixed an issue where the format of `!DOCTYPE` and `<html>` tags was altered.

### 0.9.5

- Fixed an issue where elements outside the `<html>` tag, like `!DOCTYPE`, were being removed.

### 0.9.4

- Changed category to "Formatters".

### 0.9.3

- Fixed a broken link to the marketplace.

### 0.9.2

- Initial release.
