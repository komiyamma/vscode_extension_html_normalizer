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
const jsdom = require('jsdom');
var outputChannel = vscode.window.createOutputChannel("HtmlNormalizer");
function activate(context) {
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
            }
            else {
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
exports.activate = activate;
function compareIgnoringNewlines(src, out) {
    // 改行を削除
    const srcNoNewLines = src.replace(/\s/g, '');
    const outNoNewLines = out.replace(/\s/g, '');
    // 比較
    return srcNoNewLines === outNoNewLines;
}
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map