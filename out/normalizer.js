"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareIgnoringNewlines = exports.normalizeHtml = void 0;
const jsdom = require('jsdom');
function normalizeHtml(srcHtml) {
    // 改行保持対象:
    // 1. <html> 開始タグ直後の改行ブロック
    // 2. <body> タグ直前までの行末改行シーケンス
    // 3. </body> 直後～文末の改行シーケンス
    let afterHtmlOpenNewlines = '';
    let preBodyNewlines = '';
    let afterBodyNewlines = '';
    const htmlOpen = /<html[^>]*>/i.exec(srcHtml);
    if (htmlOpen) {
        const after = srcHtml.slice(htmlOpen.index + htmlOpen[0].length);
        const m = /^([\r\n]+)/.exec(after);
        if (m) {
            afterHtmlOpenNewlines = m[1];
        }
    }
    const bodyOpen = /<body[^>]*>/i.exec(srcHtml);
    if (bodyOpen) {
        const idx = bodyOpen.index;
        // <body> 直前側で、直前に連続する \r?\n を全て取得
        const preSlice = srcHtml.slice(0, idx);
        const nlMatch = /([\r\n]+)$/.exec(preSlice);
        if (nlMatch) {
            preBodyNewlines = nlMatch[1];
        }
    }
    const bodyClose = /<\/body>/i.exec(srcHtml);
    if (bodyClose) {
        const after = srcHtml.slice(bodyClose.index + bodyClose[0].length);
        const tailMatch = /^([\r\n]+)/.exec(after);
        if (tailMatch) {
            afterBodyNewlines = tailMatch[1];
        }
    }
    // Enable source locations to distinguish explicitly provided nodes from auto-inserted ones
    const dom = new jsdom.JSDOM(srcHtml, { includeNodeLocations: true });
    let outHtml;
    // Robustly determine whether the input is a full HTML document:
    //  - If a DOCTYPE exists in the source, treat as full HTML
    //  - Else, if the <html> element exists with a source location, it was present in the source
    //  - Else, fallback to textual detection that ignores comments and <script>/<style> contents
    // This avoids false positives from comments or strings inside <script>/<style>.
    const doc = dom.window.document;
    const hasDoctype = doc.doctype !== null;
    const htmlEl = doc.documentElement;
    const htmlHasLocation = htmlEl && !!htmlEl.sourceCodeLocation; // only set when present in source
    // Fallback textual detection
    const textWithoutComments = srcHtml.replace(/<!--[\s\S]*?-->/g, '');
    const textWithoutScripts = textWithoutComments.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
    const textWithoutStyles = textWithoutScripts.replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '');
    const htmlByText = /<html[\s>]/i.test(textWithoutStyles);
    const isFullHtml = hasDoctype || htmlHasLocation || htmlByText;
    if (isFullHtml) {
        // For full HTML documents, reconstruct the document from the normalized DOM.
        // Preserve the original DOCTYPE bytes if present by extracting from the original text.
        const doctypeMatch = srcHtml.match(/<!DOCTYPE[^>]+>/i);
        const doctype = doctypeMatch ? doctypeMatch[0] + '\n' : '';
        outHtml = doctype + doc.documentElement.outerHTML;
        // script/style の内容や <body> 内部レイアウトを壊さないため、内部改行圧縮は行わない
        // <html> 開始タグ直後の改行ブロック復元（存在する場合のみ）
        if (afterHtmlOpenNewlines) {
            outHtml = outHtml.replace(/(<html[^>]*>)/i, (m) => m + afterHtmlOpenNewlines);
        }
        // <body> 直前の改行: jsdom 出力側の <body> 直前改行数と元の preBodyNewlines の長さを比較し、短い方を使用
        if (preBodyNewlines) {
            outHtml = outHtml.replace(/(<body[^>]*>)/i, (m) => m + preBodyNewlines);
        }
        // </body> 直後の改行: 末尾改行ブロックを復元（長さそのまま）
        if (afterBodyNewlines) {
            outHtml = outHtml.replace(/(<\/body>)/i, `$1${afterBodyNewlines}`);
        }
    }
    else {
        // For partial HTML snippets, parse as a fragment and serialize its children.
        const fragment = jsdom.JSDOM.fragment(srcHtml);
        const parts = [];
        Array.from(fragment.childNodes).forEach((node) => {
            if (node.nodeType === 1 && typeof node.outerHTML === 'string') {
                parts.push(node.outerHTML);
                return;
            }
            if (node.nodeType === 8) {
                const data = typeof node.data === 'string' ? node.data : (node.textContent ?? '');
                parts.push(`<!--${data}-->`);
                return;
            }
            if (typeof node.textContent === 'string') {
                parts.push(node.textContent);
                return;
            }
            if (typeof node.outerHTML === 'string') {
                parts.push(node.outerHTML);
            }
        });
        outHtml = parts.join('');
    }
    return outHtml;
}
exports.normalizeHtml = normalizeHtml;
function compareIgnoringNewlines(src, out) {
    // 改行を削除
    const srcNoNewLines = src.replace(/\s/g, '');
    const outNoNewLines = out.replace(/\s/g, '');
    // 比較
    return srcNoNewLines === outNoNewLines;
}
exports.compareIgnoringNewlines = compareIgnoringNewlines;
//# sourceMappingURL=normalizer.js.map