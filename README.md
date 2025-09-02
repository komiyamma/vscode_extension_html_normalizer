[To Japanese Version README](README.ja.md)

# Html Normalizer

[![Version](https://img.shields.io/badge/version-v0.9.9-4066ff?style=flat)](https://github.com/komiyamma/vscode_extension_html_normalizer)
[![License](https://img.shields.io/github/license/komiyamma/vscode_extension_html_normalizer.svg)](https://github.com/komiyamma/vscode_extension_html_normalizer/blob/main/LICENSE.txt)

This extension automatically corrects inconsistencies in your HTML, such as unclosed tags.
It mimics the browser's DOM interpretation for accurate normalization.

## Features

- **Auto-corrects tags:** Fixes unclosed tags and improper nesting automatically.
- **Full vs Fragment handling:** Full HTML is reconstructed and DOCTYPE preserved. HTML fragments are parsed as fragments and serialized without adding `<html>/<head>/<body>`, preserving order and keeping scripts/comments in place.
- **Robust detection:** Not fooled by `<html` inside comments or `<script>` strings when deciding full vs fragment.
- **Browser-compatible:** Uses a standards-compliant HTML parser for high compatibility.

## Usage

1. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`).
2. Type `HtmlNormalizer` and run the command.
3. The active HTML file will be normalized.

## Marketplace

[Html Normalizer - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=komiyamma.htmlnormalizer)

## Behavior Notes

- **Fragments:** Input order is preserved and elements are not moved into `<head>` automatically. In a full document, browsers may move such nodes.
- **Tables:** Browsers may insert implicit elements like `<tbody>`; the serializer reflects these insertions when applicable.
- **Invalid contexts:** Elements that require parents (e.g., `<tr>`, `<li>`) are normalized as best-effort but remain fragments; no wrappers are added by default.

---

## Change Log

### 0.9.9

- Default to fragment serialization for partial HTML: preserves input order, keeps scripts/comments, and avoids adding `<html>/<head>/<body>` wrappers.
- Harden full vs. fragment detection using parser source locations and by ignoring `<html` inside comments/scripts/styles; case-insensitive HTML tag handling.
- Replace fragile regex-based reinsertion with DOM-based serialization; preserve original DOCTYPE.
- Add tests (VS Code tests + fast unit tests) covering comments, script strings, tables (`<tbody>` insertion), nested anchors, and more.
- Add error handling with Output Channel messages.
- Update docs and packaging ignores (exclude tests, artifacts).

### 0.9.8

- Readmeのバッジエラーの解消

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
