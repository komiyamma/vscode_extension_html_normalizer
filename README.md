
[To Japanese Version README](README.ja.md)

# Html Normalizer

[![Version](https://img.shields.io/badge/version-v0.9.9-4066ff?style=flat)](https://github.com/komiyamma/vscode_extension_html_normalizer)
[![License](https://img.shields.io/github/license/komiyamma/vscode_extension_html_normalizer.svg)](https://github.com/komiyamma/vscode_extension_html_normalizer/blob/main/LICENSE.txt)

## What is Html Normalizer?

Html Normalizer is a VS Code extension that helps you clean up and fix your HTML files with just one click.  
If your HTML has missing closing tags, broken structure, or is just a fragment, this tool will automatically correct it for you—just like a web browser would.

## Main Features

- **One-click HTML cleanup:** Instantly fixes unclosed tags and messy nesting.
- **Works with fragments:** Even if your HTML is just a snippet, it keeps the structure partial and doesn’t force extra tags.
- **Browser-like results:** Uses the same logic as browsers, so your HTML will behave as expected.
- **Keeps DOCTYPE:** The `<!DOCTYPE html>` declaration stays untouched.

## How to Use

1. Open your HTML file in VS Code.
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac) to open the Command Palette.
3. Type `HtmlNormalizer` and run the command.
4. Your HTML will be instantly normalized and cleaned up.

## Who is this for?

- Anyone who edits HTML in VS Code and wants to avoid manual tag fixing.
- Web designers, students, and developers who want browser-compatible HTML.

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
