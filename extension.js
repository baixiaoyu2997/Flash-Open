// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require("fs");
const path = require("path");


function activate(context) {

    let log = vscode.window.createOutputChannel("flash-open");
    log.show();

    let file = vscode.commands.registerCommand('extension.flashOpenFile', function () {

        let config = vscode.workspace.getConfiguration('flashOpen');

        if (config.get("filePath") === "" || !fs.statSync(config.get("filePath")).isFile()) {
            vscode.window.showErrorMessage("FlashOpen: error path,please reset filePath");
            return;
        }
        _openFile(config.get("filePath"));
    })

    let folder = vscode.commands.registerCommand('extension.flashOpenFolder', function () {

        let config = vscode.workspace.getConfiguration('flashOpen');

        if (fs.statSync(config.get("folderPath")).isDirectory()) {
            _foreachFolder(config.get("folderPath"));
        } else {
            vscode.window.showErrorMessage("FlashOpen: error path,please reset folderPath");
            return;
        }
    })

    context.subscriptions.push(file, folder);
}

const _openFile = function (filePath) {
    try {
        //打开文本
        vscode.workspace.openTextDocument(filePath).then(document => {
            //显示文本
            vscode.window.showTextDocument(document)
        }, error => {
            vscode.window.showErrorMessage("FlashOpen: " + error.message);
            return;
        })
    } catch (error) {
        vscode.window.showErrorMessage(error.message);
        return;
    }
}
const _foreachFolder = function (folderPath) {
    let fileObj = {};
    let fileArr = [];
    let folderIgnore = "";
    let fileIgnore = "";
    let config = vscode.workspace.getConfiguration('flashOpen');
    //添加忽略文件
    if (config.get("fileIgnore").some(function (item, index, array) {
            let file = item + "|";
            if (index === array.length - 1) file = item;
            fileIgnore += file;
            return item === ""
        })) {
        fileIgnore = "";
        vscode.window.showErrorMessage("FlashOpen: fileIgnore array can not contain an empty string");
        return;
    }

    //添加忽略文件夹
    if (config.get("folderIgnore").some(function (item, index, array) {
            let file = item + "|";
            if (index === array.length - 1) file = item;
            folderIgnore += file;
            return item === ""
        })) {
        folderIgnore = "";
        vscode.window.showErrorMessage("FlashOpen: folderIgnore array can not contain an empty string");
        return;
    }

    try {
        var filePath = path.resolve(folderPath);
        fs.readdir(filePath, function (err, files) {
            if (err) {
                console.warn(err)
            } else {
                //遍历读取到的文件列表  
                files.forEach(function (filename) {
                    //获取当前文件的绝对路径  
                    let fileDir = path.join(filePath, filename);
                    let fileReg = fileIgnore ? new RegExp("\.(?:" + fileIgnore + ")$") : false;
                    let folderReg = folderIgnore ? new RegExp("(\\" + folderIgnore + ")$") : false;

                    fileObj[filename] = fileDir;

                    if (!(folderReg && folderReg.test(filename)) && !(fileReg && fileReg.test(filename))) {
                        fileArr.push(filename);
                    }
                });
                vscode.window.showQuickPick(fileArr).then(function (e) {
                    //处理选中的文件
                    fs.stat(fileObj[e], function (error, stats) {
                        let isFile = stats.isFile();
                        let isDir = stats.isDirectory();
                        if (error) {
                            console.warn('获取文件stats失败');
                        } else {
                            if (isFile) {
                                _openFile(fileObj[e])
                                return;
                            }
                            if (isDir) {
                                _foreachFolder(fileObj[e])
                                return;
                            }
                        }
                    })

                })
            }
        });
    } catch (error) {
        vscode.window.showErrorMessage(error.message);
        return;
    }
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;