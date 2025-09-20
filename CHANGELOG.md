# Change Log

### 0.9.11

- Provide localized display name, description, and command title via NLS resources for English and Japanese.
- Align the English and Japanese README changelog wording for version 0.9.8.

### 0.9.10

- Preserve original newline blocks after `<html>`, before `<body>`, and after `</body>` without compressing internal script/style content.
- Remove aggressive internal newline compression to avoid altering JavaScript / CSS semantics.
- Add tests for script/style newline preservation, `<html>`-after newline retention, and flexible whitespace assertions.

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

