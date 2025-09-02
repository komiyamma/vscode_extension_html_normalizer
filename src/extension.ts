import * as vscode from 'vscode';
import { normalizeHtml, compareIgnoringNewlines } from './normalizer';

var outputChannel = vscode.window.createOutputChannel("HtmlNormalizer");

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('HtmlNormalizer', () => {

		const editor = vscode.window.activeTextEditor;
		if (editor) {
			try {
				const document = editor.document;
				const srcHtml = document.getText();
				const outHtml = normalizeHtml(srcHtml);


				if (compareIgnoringNewlines(srcHtml, outHtml)) {
					return;
				}

				// 全てのテキストを選択
				const fullRange = new vscode.Range(0, 0, document.lineCount, document.lineAt(document.lineCount - 1).range.end.character);

				editor.edit(editBuilder => {
					editBuilder.replace(fullRange, outHtml);
				});
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : String(error);
				outputChannel.appendLine(`[Error] Failed to normalize HTML: ${errorMessage}`);
				outputChannel.show();
				vscode.window.showErrorMessage('HtmlNormalizer: Failed to normalize HTML. See output channel for details.');
			}
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
