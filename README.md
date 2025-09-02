[To Japanese Version README](README.ja.md)

# Html Normalizer

[![Version](https://img.shields.io/badge/version-v0.9.9-4066ff?style=flat)](https://github.com/komiyamma/vscode_extension_html_normalizer)
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

## Development

This project includes a suite of tests to ensure the normalization logic is robust and reliable.

-   **Run tests:** `npm test`

---

## Change Log

### 0.9.9 (Unreleased)

- Refactored the core normalization logic to be more robust and reliable.
- Added a comprehensive test suite to prevent regressions.
- Improved detection of full vs. partial HTML documents.
- Added error handling to prevent crashes on invalid documents.
- Updated dependencies to the latest non-major versions.

### 0.9.8

- Fixed version badge error

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
