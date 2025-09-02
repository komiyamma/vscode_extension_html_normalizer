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
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const normalizer_1 = require("./normalizer");
var outputChannel = vscode.window.createOutputChannel("HtmlNormalizer");
function activate(context) {
    let disposable = vscode.commands.registerCommand('HtmlNormalizer', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            try {
                const document = editor.document;
                const srcHtml = document.getText();
                const outHtml = (0, normalizer_1.normalizeHtml)(srcHtml);
                if ((0, normalizer_1.compareIgnoringNewlines)(srcHtml, outHtml)) {
                    return;
                }
                // 全てのテキストを選択
                const fullRange = new vscode.Range(0, 0, document.lineCount, document.lineAt(document.lineCount - 1).range.end.character);
                editor.edit(editBuilder => {
                    editBuilder.replace(fullRange, outHtml);
                });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                outputChannel.appendLine(`[Error] Failed to normalize HTML: ${errorMessage}`);
                outputChannel.show();
                vscode.window.showErrorMessage('HtmlNormalizer: Failed to normalize HTML. See output channel for details.');
            }
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map