===

标题: [web前端] JS: reduce 方法实现 webpack 多文件入口
标签: 前端工程化, nodejs

===

> 这篇日志，在开始接触 webpack 时候就该写了，现在发布也许对一些刚入此坑的童鞋能些许帮助。。。
即使有点 low，重要的仍是分享

## 1. reduce 方法介绍

### 1.1 简单场景

reduce 函数的设计意图就是方便进行叠加运算：

```js
var arr = [0, 1, 2, 3];

// reduce 实现累加
var total = arr.reduce(function (pre, cur){
  return pre + cur;
}, 0);

console.log(total);    // 6
```

上述代码中，reduce 方法有两个参数，第一个参数是一个 callback，用于进行计算的函数；第二个参数则是累加计算的初始值: 0
reduce 以 0 作为初始值，从数组第 0 项开始累加，上述代码的计算过程如下：

```js
total = 0;        // => 0
total = 0 + 0;    // => 0
total = 0 + 1;    // => 1
total = 1 + 2;    // => 3
total = 3 + 3;    // => 6
```

若不设置初始值 0，则 reduce 以数组第 0 项作为初始值，从第 1 项开始累加，其计算过程如下：

```js
total = 0;        // => 0
total = 0 + 1;    // => 1
total = 1 + 2;    // => 3
total = 3 + 3;    // => 6
```

可以看出，reduce 函数根据初始值 0，不断进行叠加，完成最简单的数组累加。

### 1.2 两种简单的运用场景

第一个 demo，使用 reduce 函数进行二维数组的拼接：

```js
var arr = [ [0], [1, 2], [3, 4, 5] ];

// reduce 实现数组拼接
var result = arr.reduce(function (pre, cur){
  return pre.concat(cur);
}, []);

console.log(result);    // [0, 1, 2, 3, 4, 5]
```

第二个 demo，使用 reduce 函数构造 JSON 数组：

```js
// 此例演示：将所有员工的姓名进行拆分
var staff = ['Bob Dell', 'Johon Jobs', 'Maria July'];

// reduce 构造 JSON 数组
var result = staff.reduce(function (arr, full_name){
  arr.push({
    first_name: full_name.split(' ')[0],
    last_name: full_name.split(' ')[1]
  });

  return arr;
}, []);

console.log(JSON.stringify(result));
//  [{"first_name":"Bob","last_name":"Dell"},{"first_name":"Johon","last_name":"Jobs"},{"first_name":"Maria","last_name":"July"}]
```

灵活使用 reduce 函数，能为我们节省不少中间变量和代码。

## 2. 用于实现 webpack 多文件入口配置

webpack 配置项中```entry```参数用于配置入口文件路径，通常对于只打包一个目录下的文件，只需要遍历该目录，构造一个如下的对象传递给```entry```即可：

```js
// 注：index.js 为每个页面的入口文件，所有页面均在 ./fe/pages/ 目录下
var entry = {
  index: './fe/pages/home/index.js',
  list: './fe/pages/list/index.js'
};
```

通常，我们使用 reduce 方法来遍历同一目录下的入口：

```js
var fs = require('fs');
var path = require('path');
...

// 定义入口路径
var entryPath = './fe/pages';

// 遍历路径下多文件入口
var entris = fs.readdirSync(entryPath).reduce(function (o, filename) {
  !/\./.test(filename) &&
  (o[filename] = './' + path.join(entryPath, filename, 'index.js'));
  return o;
}, {});

// entry = {
//   index: './fe/pages/home/index.js',
//   list: './fe/pages/list/index.js'
// }
```

对于多页面应用的开发场景，也许会需要构造类似于下面这样的一个对象：

```js
// 多个入口，页面、公共组件并不一定在同一个目录下
var entry = {
  index: './fe/pages/home/index.js',
  list: './fe/pages/list/index.js',
  header: './fe/components/header/index.js',
  footer: './fe/components/footer/index.js'
};
```

可以发现，我们要打包的页面、公共组件不一定在同一个目录下，这时候就需要对原先的方法进行扩展，见代码：

```js
var fs = require('fs');
var path = require('path');
...

// 定义入口路径
var entryPath = ['./fe/pages', './fe/components'];

// 遍历路径下多文件入口
var mkEntriesMap = function (entryPath){
  if (typeof(entryPath) == 'string') {    // 若 entryPath 为字符串，则直接遍历此目录
    var path_map = fs.readdirSync(entryPath).map(function (filename){
      return filename + '::./' + path.join(entryPath, filename, 'index.js');
    });
  } else if (typeof(entryPath) == 'object') {    // 若 entryPath 为数组，则进行两级遍历
    var path_map = entryPath.map(function (entry){
      return fs.readdirSync(entry).map(function (filename){
        return filename + '::./' + path.join(entry, filename, 'index.js');
      });
    }).reduce(function (preArr, curArr){
      return preArr.concat(curArr);
    }, []);
  } else {
    throw 'Type of config.entryPath is not valid.';
    return;
  }

  return path_map.reduce(function (o, file_map){
    var file_name = file_map.split('::')[0];
    var file_path = file_map.split('::')[1];

    if (!/\./.test(file_name)) {
      o[file_name] = file_path;
    }

    return o;
  }, {});
};

// 构造对象
var entris = mkEntriesMap(entryPath);

// entry = {
//   index: './fe/pages/home/index.js',
//   list: './fe/pages/list/index.js',
//   header: './fe/components/header/index.js',
//   footer: './fe/components/footer/index.js'
// }
```

这样做的好处在于，只需配置一开始的```entryPath```就行了，同时支持单个或多个路径下的文件打包：

```js
// entryPath 可以为一个字符串
var entryPath = './fe/pages';

// entryPath 也可以设为一个数组
var entryPath = ['./fe/pages', './fe/components'];
```
