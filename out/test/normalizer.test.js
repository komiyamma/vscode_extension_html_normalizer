"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
const mocha_1 = require("mocha");
const normalizer_1 = require("../normalizer");
(0, mocha_1.suite)('HtmlNormalizer Test Suite', () => {
    // --- Tests for Partial HTML ---
    (0, mocha_1.test)('Partial HTML: Should close unclosed tags', () => {
        const input = '<div><p>hello</div>';
        const expected = '<div><p>hello</p></div>';
        assert.strictEqual((0, normalizer_1.normalizeHtml)(input), expected);
    });
    (0, mocha_1.test)('Partial HTML: Should fix improper nesting', () => {
        const input = '<b><i>hello</b></i>';
        const expected = '<b><i>hello</i></b>';
        assert.strictEqual((0, normalizer_1.normalizeHtml)(input), expected);
    });
    (0, mocha_1.test)('Partial HTML: Should handle multiple root elements', () => {
        const input = '<p>one</p><div>two</div>';
        const expected = '<p>one</p><div>two</div>';
        assert.strictEqual((0, normalizer_1.normalizeHtml)(input), expected);
    });
    // --- Tests for Full HTML ---
    (0, mocha_1.test)('Full HTML: Should preserve DOCTYPE and attributes on html tag', () => {
        const input = '<!DOCTYPE html>\n<html lang="en">';
        const expected = '<!DOCTYPE html>\n<html lang="en"><head></head><body></body></html>';
        assert.strictEqual((0, normalizer_1.normalizeHtml)(input), expected);
    });
    (0, mocha_1.test)('Full HTML: Should normalize content within body', () => {
        const input = '<html><body><div><p>unclosed</body></html>';
        const expected = '<html><head></head><body><div><p>unclosed</p></div></body></html>';
        assert.strictEqual((0, normalizer_1.normalizeHtml)(input), expected);
    });
    (0, mocha_1.test)('Full HTML: Should handle uppercase HTML tag for detection', () => {
        const input = '<HTML><HEAD></HEAD><BODY><p>test</p></BODY></HTML>';
        const expected = '<html><head></head><body><p>test</p></body></html>';
        assert.strictEqual((0, normalizer_1.normalizeHtml)(input), expected);
    });
    (0, mocha_1.test)('Full HTML: Should handle missing body tag', () => {
        const input = '<html><p>no body tag</html>';
        const expected = '<html><head></head><body><p>no body tag</p></body></html>';
        assert.strictEqual((0, normalizer_1.normalizeHtml)(input), expected);
    });
    // --- Tests for Edge Cases ---
    (0, mocha_1.test)('Edge Case: HTML detection fooled by comment', () => {
        const input = '<!-- <html> --><div><p>test</div>';
        // Fragment serialization preserves the leading comment and fixes the unclosed <p>.
        const expected = '<!-- <html> --><div><p>test</p></div>';
        assert.strictEqual((0, normalizer_1.normalizeHtml)(input), expected);
    });
    (0, mocha_1.test)('Edge Case: HTML detection should ignore <html in <script> string', () => {
        const input = '<script>const t = "<html>"; /* not a tag */</script><div><p>x</div>';
        // Fragment serialization keeps the <script> in place and fixes the unclosed <p>.
        const expected = '<script>const t = "<html>"; /* not a tag */</script><div><p>x</p></div>';
        assert.strictEqual((0, normalizer_1.normalizeHtml)(input), expected);
    });
    (0, mocha_1.test)('Edge Case: Empty input', () => {
        const input = '';
        const expected = '';
        assert.strictEqual((0, normalizer_1.normalizeHtml)(input), expected);
    });
});
//# sourceMappingURL=normalizer.test.js.map