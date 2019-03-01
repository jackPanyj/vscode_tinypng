
import tinify from 'tinify';
import * as vscode from 'vscode';

const compressImage = (file: any) => {
	const status = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
	status.text = '正在压缩图片' + file.path;
	status.show();
	const source = tinify.fromFile(file.path);
	source.toFile(file.path, (err) => {
		status.hide();
		if (err) {
			compressImage(file);
		}
	});
};


export function activate(context: vscode.ExtensionContext) {
	tinify.key = 'H59Q1cgdhz7FFqQDhp2x3QNnmN56jzyT';
	let disposable = vscode.commands.registerCommand('extension.compressFile', compressImage);

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
