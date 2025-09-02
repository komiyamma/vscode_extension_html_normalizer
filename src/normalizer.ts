const jsdom = require('jsdom');

export function normalizeHtml(srcHtml: string): string {
	const dom = new jsdom.JSDOM(srcHtml);
	let outHtml;

	// To determine if the input is a full HTML document or a partial snippet,
	// we check for the presence of an <html> tag.
	// We remove comments first to avoid false positives from `<html>` tags inside comments.
	const withoutComments = srcHtml.replace(/<!--[\s\S]*?-->/g, '');
	const isFullHtml = /<html[\s>]/i.test(withoutComments);

	if (isFullHtml) {
		// For full HTML documents, we reconstruct the document from the normalized DOM.
		// This is more robust than regex-based replacement.
		// We also preserve the original DOCTYPE declaration if it exists.
		const doctypeMatch = srcHtml.match(/<!DOCTYPE[^>]+>/i);
		const doctype = doctypeMatch ? doctypeMatch[0] + '\n' : '';
		outHtml = doctype + dom.window.document.documentElement.outerHTML;
	} else {
		// For partial HTML snippets, we return the normalized content of the <body> tag.
		// JSDOM wraps snippets in a full <html><body>...</body></html> structure,
		// so this extracts the relevant normalized part.
		outHtml = dom.window.document.body.innerHTML;
	}

	return outHtml;
}


export function compareIgnoringNewlines(src: string, out: string) {
	// 改行を削除
	const srcNoNewLines = src.replace(/\s/g, '');
	const outNoNewLines = out.replace(/\s/g, '');

	// 比較
	return srcNoNewLines === outNoNewLines;
}
