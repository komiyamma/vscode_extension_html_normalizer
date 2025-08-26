import * as vscode from 'vscode';
const jsdom = require('jsdom');

var outputChannel = vscode.window.createOutputChannel("HtmlNormalizer");

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('HtmlNormalizer', () => {

		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const srcHtml = document.getText();

			const dom = new jsdom.JSDOM(srcHtml);
			let outHtml;

			// This extension is intended for HTML that is the entire file, or a partial piece of HTML.
			// The processing is divided accordingly.
			// ファイル全体であるHTMLか、部分的なHTMLである事を想定した拡張機能です。
			// それに応じて処理を分けています。
			if (srcHtml.includes("<html")) {

				// In the case of entire HTML, we want to keep the original formatting of the <! DOCTYPE ...> and <html ...> parts.
				// Therefore, we will replace only the <head> and <body> parts with the normalized ones.
				// 全体HTMLの場合は、<!DOCTYPE ...>や<html ...>部分のオリジナルのフォーマットを維持したい。
				// そのため、<head>と<body>の中身だけを正規化したものに差し替える
				const normalizedHeadContent = dom.window.document.head.innerHTML;
				const normalizedBodyContent = dom.window.document.body.innerHTML;

				outHtml = srcHtml;

				const headRegex = /<head.*?>([\s\S]*)<\/head>/is;
				if (outHtml.match(headRegex)) {
					outHtml = outHtml.replace(headRegex, (match) => {
						const headTag = match.substring(0, match.indexOf('>') + 1);
						return `${headTag}${normalizedHeadContent}</head>`;
					});
				} else {
					// If there is no <head> tag, we do not do anything special.
					// <head>タグがない場合は、特別な事はしない
				}

				const bodyRegex = /<body.*?>([\s\S]*)<\/body>/is;
				if (outHtml.match(bodyRegex)) {
					outHtml = outHtml.replace(bodyRegex, (match) => {
						const bodyTag = match.substring(0, match.indexOf('>') + 1);
						return `${bodyTag}${normalizedBodyContent}</body>`;
					});
				} else {
					// If there is no <body> tag, we do not do anything special.
					// <body>タグがない場合は、特別な事はしない
				}


			} else {
				// In the case of partial HTML, we will only make it partial.
				//部分的なHTMLならば... あくまでも部分的にする

				let normalizedHtml = dom.serialize();
				// JSDOM will add its own header and footer, so we will remove them.
				// 勝手にJSDOMが追加したヘッダー部分やフッター部分を削除する
				let head = "<html><head></head><body>";
				normalizedHtml = normalizedHtml.replace(head, "");
				let foot = "</body></html>";
				normalizedHtml = normalizedHtml.replace(foot, "");
				outHtml = normalizedHtml;
			}

			if (compareIgnoringNewlines(srcHtml, outHtml)) {
				return;
			}

			// 全てのテキストを選択
			const fullRange = new vscode.Range(0, 0, editor.document.lineCount, editor.document.lineAt(editor.document.lineCount - 1).range.end.character);

			editor.edit(editBuilder => {
				editBuilder.replace(fullRange, outHtml);
			});
		}
	});

	context.subscriptions.push(disposable);
}


function compareIgnoringNewlines(src: string, out: string) {
	// 改行を削除
	const srcNoNewLines = src.replace(/\s/g, '');
	const outNoNewLines = out.replace(/\s/g, '');

	// 比較
	return srcNoNewLines === outNoNewLines;
}



// This method is called when your extension is deactivated
export function deactivate() { }
