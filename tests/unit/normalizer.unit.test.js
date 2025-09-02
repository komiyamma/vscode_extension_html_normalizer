const assert = require('assert');
const path = require('path');

// Load compiled JS from out/
const normalizer = require(path.resolve(__dirname, '../../out/normalizer.js'));

function test(name, fn) {
  try {
    fn();
    console.log(`ok - ${name}`);
  } catch (err) {
    console.error(`not ok - ${name}`);
    console.error(err && err.stack ? err.stack : String(err));
    process.exitCode = 1;
  }
}

// --- Partial HTML ---
test('Partial: closes unclosed tags', () => {
  const input = '<div><p>hello</div>';
  const expected = '<div><p>hello</p></div>';
  assert.strictEqual(normalizer.normalizeHtml(input), expected);
});

test('Partial: fixes improper nesting', () => {
  const input = '<b><i>hello</b></i>';
  const expected = '<b><i>hello</i></b>';
  assert.strictEqual(normalizer.normalizeHtml(input), expected);
});

test('Partial: multiple roots preserved', () => {
  const input = '<p>one</p><div>two</div>';
  const expected = '<p>one</p><div>two</div>';
  assert.strictEqual(normalizer.normalizeHtml(input), expected);
});

// --- Full HTML ---
test('Full: preserves DOCTYPE and html attrs', () => {
  const input = '<!DOCTYPE html>\n<html lang="en">';
  const expected = '<!DOCTYPE html>\n<html lang="en"><head></head><body></body></html>';
  assert.strictEqual(normalizer.normalizeHtml(input), expected);
});

test('Full: normalizes content within body', () => {
  const input = '<html><body><div><p>unclosed</body></html>';
  const expected = '<html><head></head><body><div><p>unclosed</p></div></body></html>';
  assert.strictEqual(normalizer.normalizeHtml(input), expected);
});

test('Full: detects uppercase <HTML>', () => {
  const input = '<HTML><HEAD></HEAD><BODY><p>test</p></BODY></HTML>';
  const expected = '<html><head></head><body><p>test</p></body></html>';
  assert.strictEqual(normalizer.normalizeHtml(input), expected);
});

test('Full: handles missing <body>', () => {
  const input = '<html><p>no body tag</html>';
  const expected = '<html><head></head><body><p>no body tag</p></body></html>';
  assert.strictEqual(normalizer.normalizeHtml(input), expected);
});

// --- Edge Cases ---
test('Detect: ignore comment with <html>', () => {
  const input = '<!-- <html> --><div><p>test</div>';
  const expected = '<!-- <html> --><div><p>test</p></div>';
  assert.strictEqual(normalizer.normalizeHtml(input), expected);
});

test('Detect: ignore "<html" inside <script> string', () => {
  const input = '<script>const t = "<html>"; /* not a tag */</script><div><p>x</div>';
  const expected = '<script>const t = "<html>"; /* not a tag */</script><div><p>x</p></div>';
  assert.strictEqual(normalizer.normalizeHtml(input), expected);
});

test('Misc: empty input yields empty output', () => {
  const input = '';
  const expected = '';
  assert.strictEqual(normalizer.normalizeHtml(input), expected);
});

// --- compareIgnoringNewlines ---
test('CompareIgnoringNewlines: treats whitespace-only changes as equal', () => {
  assert.strictEqual(normalizer.compareIgnoringNewlines('<p>a</p>', '<p> a </p>'), true);
});

test('CompareIgnoringNewlines: incorrectly treats semantic difference as equal', () => {
  // Known limitation documented in ISSUES.md
  assert.strictEqual(normalizer.compareIgnoringNewlines('<b>h ello</b>', '<b>hello</b>'), true);
});

// --- Additional Partial HTML tests ---

test('Partial: unclosed <li> becomes closed', () => {
  const input = '<li>item';
  const expected = '<li>item</li>';
  assert.strictEqual(normalizer.normalizeHtml(input), expected);
});

test('Partial: <ul> with consecutive <li> auto-closes each', () => {
  const input = '<ul><li>a<li>b</ul>';
  const expected = '<ul><li>a</li><li>b</li></ul>';
  assert.strictEqual(normalizer.normalizeHtml(input), expected);
});

test('Partial: nested unclosed tags are fixed', () => {
  const input = '<div><span>text</div>';
  const expected = '<div><span>text</span></div>';
  assert.strictEqual(normalizer.normalizeHtml(input), expected);
});

test('Partial: block inside <p> closes <p>', () => {
  const input = '<p>hello<div>world</div>';
  const expected = '<p>hello</p><div>world</div>';
  assert.strictEqual(normalizer.normalizeHtml(input), expected);
});

test('Partial: unclosed <script> closes at EOF', () => {
  const input = '<script>var x=1';
  const expected = '<script>var x=1</script>';
  assert.strictEqual(normalizer.normalizeHtml(input), expected);
});

test('Partial: unclosed <style> closes at EOF', () => {
  const input = '<style>p{color:red';
  const expected = '<style>p{color:red</style>';
  assert.strictEqual(normalizer.normalizeHtml(input), expected);
});

test('Partial: nested <a> auto-closes previous <a>', () => {
  const input = '<a>one<a>two</a>three';
  const expected = '<a>one</a><a>two</a>three';
  assert.strictEqual(normalizer.normalizeHtml(input), expected);
});

test('Partial: self-closing-like tags normalized (img/br)', () => {
  const input = '<div><img src=a><br>text';
  const expected = '<div><img src="a"><br>text</div>';
  assert.strictEqual(normalizer.normalizeHtml(input), expected);
});

test('Partial: custom element unclosed becomes closed', () => {
  const input = '<x-foo>bar';
  const expected = '<x-foo>bar</x-foo>';
  assert.strictEqual(normalizer.normalizeHtml(input), expected);
});

test('Partial: table structure inserts <tbody>', () => {
  const input = '<table><tr><td>x';
  const expected = '<table><tbody><tr><td>x</td></tr></tbody></table>';
  assert.strictEqual(normalizer.normalizeHtml(input), expected);
});
