// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
let exec = require('child_process').exec;

var outputChannel = vscode.window.createOutputChannel("HtmlNormalizer");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "htmlnormalizer" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	let disposable = vscode.commands.registerCommand('HtmlNormalizer', () => {

		let filename: string | undefined = vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.fileName;

		let cmd = `node C:/usr/htmlnormalizer/HtmlNormalizere.js "${filename}"`;
		exec(cmd, function (error: any, stdout: any, stderr: any) {
			// シェル上でコマンドを実行できなかった場合のエラー処理
			if (error !== null) {
				console.log('exec error: ' + error);
				return;
			}
		});

		outputChannel.append("Html Normalized\n");

		console.log('HtmlNormalizer!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
