"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareIgnoringNewlines = exports.normalizeHtml = void 0;
const jsdom = require('jsdom');
function normalizeHtml(srcHtml) {
    const dom = new jsdom.JSDOM(srcHtml);
    let outHtml;
    // First, remove comments to avoid false positives in the detection regex.
    const withoutComments = srcHtml.replace(/<!--[\s\S]*?-->/g, '');
    const isFullHtml = /<html[\s>]/i.test(withoutComments);
    if (isFullHtml) {
        // For full HTML documents, preserve the doctype and reconstruct from the normalized dom.
        const doctypeMatch = srcHtml.match(/<!DOCTYPE[^>]+>/i);
        const doctype = doctypeMatch ? doctypeMatch[0] + '\n' : '';
        outHtml = doctype + dom.window.document.documentElement.outerHTML;
    }
    else {
        // In the case of partial HTML, just return the normalized content of the body.
        outHtml = dom.window.document.body.innerHTML;
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