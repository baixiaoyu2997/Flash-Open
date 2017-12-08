# flash-open

this extension for quick open file or folder by hot key

## Why I need this?
this extension looks like `ctrl+p`,now let's talk about its shortcomings:  
1. it can not open unopened files quickly  
1. it can not keep the file's history all the time  

 flashOpen faster than it,flashOpen can open specify the file by shortcut keys,this usually helps in writing notes quickly or check the documentation.  
 sometimes some private folders will be stored in a single folder, such as dropbox,when you want to quickly view the file in the dropbox, and do not switch the current workspace,flashOpen will be helpful

## Features

1. quick open file, by hot key or command,keyboard shortcuts: `alt+o`
	
1. quick shows a folder selection list. by hot key or command,keyboard shortcuts: `ctrl+alt+o`
	
1. You can specify ignored files
    
1. You can specify ignored folders

-----------------------------------

![](https://raw.githubusercontent.com/baixiaoyu2997/Flash-Open/master/image/quickOpenFile.gif)  

![](https://raw.githubusercontent.com/baixiaoyu2997/Flash-Open/master/image/openFolder.gif)

## Extension Settings

* `flashOpen.filePath`: quickly open the specified file,e.g.,'E:\workspace\note.txt'
* `flashOpen.folderPath`: quickly open the specified folder,e.g.,'E:\workspace'
* `flashOpen.fileIgnore`: the specified file is not displayed in the list,e.g.,'['doc','jpg','pptx']'
* `flashOpen.folderIgnore`: the specified folder is not displayed in the list ,e.g.,'['node_modules']'

## Release Notes

### 0.1.0

* Initial release of

### 0.2.0

* add file&folder icon  
* add Back to previous menu options