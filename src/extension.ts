
import tinify from 'tinify';
import * as vscode from 'vscode';
export function activate(context: vscode.ExtensionContext) {
	tinify.key = 'H59Q1cgdhz7FFqQDhp2x3QNnmN56jzyT';
	let disposable = vscode.commands.registerCommand('extension.compressFile', (file) => {
		tinify.fromFile(file.path).toFile(file.path);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
