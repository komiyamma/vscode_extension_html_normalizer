// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
let exec = require('child_process').exec;
const fs = require('fs');
const jsdom = require('jsdom');

const filename = process.argv[2]; // コマンドライン引数で指定されたファイル名を取得

const html = fs.readFileSync(filename, 'utf8');

const dom = new jsdom.JSDOM(html);

let allText = dom.window.document.documentElement.outerHTML;

let head = "<html><head></head><body>";
allText = allText.replace(head, "");

let foot = "</body></html>";
allText = allText.replace(foot, "");

fs.writeFileSync(filename, allText, 'utf8');

