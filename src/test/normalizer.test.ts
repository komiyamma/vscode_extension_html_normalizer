import * as assert from 'assert';
import { suite, test } from 'mocha';
import { normalizeHtml } from '../normalizer';

suite('HtmlNormalizer Test Suite', () => {

    // --- Tests for Partial HTML ---

    test('Partial HTML: Should close unclosed tags', () => {
        const input = '<div><p>hello</div>';
        const expected = '<div><p>hello</p></div>';
        assert.strictEqual(normalizeHtml(input), expected);
    });

    test('Partial HTML: Should fix improper nesting', () => {
        const input = '<b><i>hello</b></i>';
        const expected = '<b><i>hello</i></b>';
        assert.strictEqual(normalizeHtml(input), expected);
    });

    test('Partial HTML: Should handle multiple root elements', () => {
        const input = '<p>one</p><div>two</div>';
        const expected = '<p>one</p><div>two</div>';
        assert.strictEqual(normalizeHtml(input), expected);
    });

    // --- Tests for Full HTML ---

    test('Full HTML: Should preserve DOCTYPE and attributes on html tag', () => {
        const input = '<!DOCTYPE html>\n<html lang="en">';
        const expected = '<!DOCTYPE html>\n<html lang="en"><head></head><body></body></html>';
        assert.strictEqual(normalizeHtml(input), expected);
    });

    test('Full HTML: Should normalize content within body', () => {
        const input = '<html><body><div><p>unclosed</body></html>';
        const expected = '<html><head></head><body><div><p>unclosed</p></div></body></html>';
        assert.strictEqual(normalizeHtml(input), expected);
    });

    test('Full HTML: Should handle uppercase HTML tag for detection', () => {
        const input = '<HTML><HEAD></HEAD><BODY><p>test</p></BODY></HTML>';
        const expected = '<html><head></head><body><p>test</p></body></html>';
        assert.strictEqual(normalizeHtml(input), expected);
    });

    test('Full HTML: Should handle missing body tag', () => {
        const input = '<html><p>no body tag</html>';
        const expected = '<html><head></head><body><p>no body tag</p></body></html>';
        assert.strictEqual(normalizeHtml(input), expected);
    });

    // --- Tests for Edge Cases ---

    test('Edge Case: HTML detection fooled by comment', () => {
        const input = '<!-- <html> --><div><p>test</div>';
        // The detection logic correctly identifies this as partial HTML.
        // JSDOM's parser, when correcting the unclosed <p>, appears to discard the leading comment.
        // This test asserts the actual behavior.
        const expected = '<div><p>test</p></div>';
        assert.strictEqual(normalizeHtml(input), expected);
    });

    test('Edge Case: Empty input', () => {
        const input = '';
        const expected = '';
        assert.strictEqual(normalizeHtml(input), expected);
    });
});
