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
			let outHtml = dom.window.document.documentElement.outerHTML;

			let hasHtmlHead = false;
			if (srcHtml.includes("<html")) {
				hasHtmlHead = true;
			}

			// 元々がちゃんとした<html ...>といったようにフルのHTMLの予定のファイルならば...
			if (hasHtmlHead) {
				; // 何もしない

			// そうではなく部分的なHTMLならば... あくまでも部分的にする
			} else {

				// 勝手にJSDOMが追加したヘッダー部分やフッター部分を削除する
				let head = "<html><head></head><body>";
				outHtml = outHtml.replace(head, "");
				let foot = "</body></html>";
				outHtml = outHtml.replace(foot, "");
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
