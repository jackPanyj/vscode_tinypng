
import tinify from 'tinify';
import * as vscode from 'vscode';

let apiKeys: string[] = [];

let errTimes: number = 0;

const setKey = () => {
	tinify.key = apiKeys[0];
	const tmp = apiKeys.shift() as string;
	apiKeys.push(tmp);
};

const compressImage = (file: any) => {
	const status = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
	status.text = 'compressing: ' + file.path;
	status.show();
	const source = tinify.fromFile(file.path);
	source.toFile(file.path, (err) => {
		status.hide();
		if (err) {
			errTimes += 1;
			if (errTimes === apiKeys.length) {
				vscode.window.showErrorMessage('apiKeys maybe has done');
				return;
			}
			setKey();
			compressImage(file);
		}
	});
};

const compressFolder = (folder: any)=> {
	vscode.workspace.findFiles(new vscode.RelativePattern(folder.path, '**/*.{png,jpg,jpeg}'))
	.then(files => {
		files.forEach(compressImage);
	});
};

export function activate(context: vscode.ExtensionContext) {
	apiKeys = vscode.workspace.getConfiguration('tinypng').get('apiKeys') as string[];
	if (apiKeys == null) {
		vscode.window.showErrorMessage('please set your tinypng apiKeys');
		return;
	}
	setKey();
	context.subscriptions.push(vscode.commands.registerCommand('extension.compressFolder', compressFolder));
	context.subscriptions.push(vscode.commands.registerCommand('extension.compressFile', compressImage));
}

// this method is called when your extension is deactivated
export function deactivate() {}
