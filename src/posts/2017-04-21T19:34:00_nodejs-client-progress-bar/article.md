===

标题: nodejs 终端打印进度条
标签: nodejs

===

### 1. 场景导入

当我们对大量文件进行批量处理的时候(例如：上传/下载、保存、编译等)，常常希望知道当前进展如何，或者失败(成功)的任务有多少；当我们的代码或程序已经发布，用户在执行安装的过程中，一个合适的（终端/命令行）进度条可以准确反映安装的步骤和进程，提升程序的可用性，一定程度缓解用户在等待中的烦恼……

### 2. 基本原理

首先，在终端打印出文本是件比较容易的事情。
那么使用简单的文本和符号，就够自己拼凑出命令行的效果（下面例子）:

```bash
文件已上传: 43.60% █████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 150/344
```

当然，进度条的效果可以根据需要自己设计啦，我这里只是给大家一个参考。

这里，我将打印命令行的方法构造成一个工具模块 ```progress-bar.js```，具体实现如下 :-)

```js
// 这里用到一个很实用的 npm 模块，用以在同一行打印文本
var slog = require('single-line-log').stdout;

// 封装的 ProgressBar 工具
function ProgressBar(description, bar_length){
  // 两个基本参数(属性)
  this.description = description || 'Progress';       // 命令行开头的文字信息
  this.length = bar_length || 25;                     // 进度条的长度(单位：字符)，默认设为 25

  // 刷新进度条图案、文字的方法
  this.render = function (opts){
    var percent = (opts.completed / opts.total).toFixed(4);    // 计算进度(子任务的 完成数 除以 总数)
    var cell_num = Math.floor(percent * this.length);             // 计算需要多少个 █ 符号来拼凑图案

    // 拼接黑色条
    var cell = '';
    for (var i=0;i<cell_num;i++) {
      cell += '█';
    }

    // 拼接灰色条
    var empty = '';
    for (var i=0;i<this.length-cell_num;i++) {
      empty += '░';
    }

    // 拼接最终文本
    var cmdText = this.description + ': ' + (100*percent).toFixed(2) + '% ' + cell + empty + ' ' + opts.completed + '/' + opts.total;

    // 在单行输出文本
    slog(cmdText);
  };
}

// 模块导出
module.exports = ProgressBar;
```
### 3. Run 起来

基于上面的实现，先说一下这个 ```progress-bar.js``` 的用法：

```js
// 引入工具模块
var ProgressBar = require('./progress_bar');

// 初始化一个进度条长度为 50 的 ProgressBar 实例
var pb = new ProgressBar('下载进度', 50);

// 这里只是一个 pb 的使用示例，不包含任何功能
var num = 0, total = 200;
function downloading() {
  if (num <= total) {
    // 更新进度条
    pb.render({ completed: num, total: total });

    num++;
    setTimeout(function (){
      downloading();
    }, 500)
  }
}
downloading();
```

run 一下上面的代码，执行效果如下：

![](http://upload-images.jianshu.io/upload_images/590155-0efe80d8c7068908.gif?imageMogr2/auto-orient/strip)
