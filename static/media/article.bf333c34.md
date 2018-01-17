===

标题: [web前端发微] 潇洒地操作 window.history
标签: 前端

===

如果你想在 web 应用实现类似 pjax 的功能特性，往往需要做一些准备，比如对于不支持 history.pushState 方法的部分浏览器，怎样去做优雅降级，以满足页面整体的可用性等等。这篇文章主要来说说 pjax 相关的问题和思路。

### 1. Why pjax?

首先，因为我们必然会用到 ajax 来搞定数据，在 js 中执行的请求和 DOM 操作并不会被 history 记录（这么说虽然不严谨，帮助理解就好）；

其次，单页面应用场景（或者某一个页面有多个交互状态的情况）下，浏览器的前进后退功能无法获取到某一次 ajax 操作或者交互的状态；

第三（你以为我会说最后？so cute!），接前面所述，当页面在某种状态下被分享或者传播时，新的用户进入后，页面本应该维持在上个用户分享或传播时的状态（比如你经常在朋友圈分享的各种活动页面等等）...

基于以上且不限于以上所述的种种需求，pjax 的策略便应运而生。

![PJAX 机制（图片来源：百度搜索）](http://upload-images.jianshu.io/upload_images/590155-0f79eaf9595bd613.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 2. Pjax 的机制

参考上面的示意图，用一种简单的方式来描述这个机制的过程：

首先，在执行 ajax 操作时，我们使用 pushState 方法向 浏览器的 history 对象中写入一个特定的状态值（一组参数），保证每一次 ajax 请求都能有一个相应的 history 记录（history.state）；

那么之后，当我们访问 history 的不同状态的时候（比如点击浏览器前进、后退按钮），通过当前状态值我们也能找到与之对应的 ajax 操作。

这里 pushState 方法的一个好处，就是可以在不重载页面的情况下，改写浏览器地址栏 url（同时改变 window.location.href）。

### 3. Pjax 的本质

Pjax 给我们提供了一个方案，而不仅仅是 pjax 的本身内容。我们至少可以从两个方面来拓展一下：

> 如果没有 pushState，可以用其他方式来影响浏览器的历史记录吗？

  * 如果你比较了解 React 或者 Angular 的 router 实现，那么这个问题很容易理解。比如 react-router 给予我们两种选择，一种是基于 history.pushState 的路由实现，一种是基于 location.hash 的实现，后者相对前者而言，适用性更强一些，毕竟 锚点 这个东西，在 web1.0 时代我们就很熟悉了。使用 location.hash 能够满足低版本浏览器的需要。

> 如果把 ajax 操作换成其他操作呢？比如一般的 DOM 操作

如此看来，借鉴于 pjax 的机制和原理，我们能干的事情很多。对于需要让浏览器记录的事件操作或者状态，我们按这个套路实现就好了。

### 4. By the way, and how to do?

基于上面的讨论，如果你已经有种想做点什么的冲动。那么，我想我们已经产生了共鸣。
看到这里，不妨给文章点个赞或者丢几个硬币什么的，十分感激 (Xie-Xie-Ba-Ba)

> 抛开单纯的 pjax 实现（比如 jquery-pjax 等等）
如果我们可以自己做一个小工具（方法类库之类的）
利用浏览器的 history 来驱动页面的操作或者行为
解决更多的问题
或者实现一个全新的功能
是不是很 cool ？

### 5. 欲望清单

这个小标题看起来可能的有点中二（或者有点标题党吧）。。。

从需求出发来考虑设计实现（需求驱动），是培养架构能力的好习惯。（~嘤~嘤~嘤）

##### 5.1 需求清单:

* 我们想做一个更通用的 pushState 方法，用法如下（考虑逼格，展示 ES6 语法的伪代码）：

```js
// 以 import 形式引入依赖，easierHistory 是我们最终构造的方法集（一个对象或构造器）或者工具包
import easierHis from './easierHistory';

// ...do something...

// 向浏览器历史插入一条记录 （例如：我们做一个翻页的效果时，传入值为一个页码）
easierHis.putState({page: 3});

/* 注：为与原有 pushState 方法区别，故将新方法命名为 putState */
```

* 我们想通过一个方法（或者接口）访问到当前的历史状态（更通用的 history.state 方法）：

```js
// 获取当前历史状态 state
let { state } = easierHis.getState();

/* 注：为与原有 state 方法区别，故将新方法命名为 getState */
```

（3）构造一个通用的方法，当进行浏览器前进后退操作时，可以触发一些操作：

```js
// 获取当前历史状态 state
easierHis.popState( (state) => { do something... } );

/* 注：这里我们给 popState 方法传入一个回调，回调的内容就是我们想要触发的操作 */
```

##### 5.2 一个完整的需求实例:
综合考虑一个实际的应用场景，比如我们想要用自己构造的这种类 pjax 机制实现一个有记录、可前进回退的翻页效果。大致的实现如下：

```js
import easierHis from './easierHistory';

// 默认加载第 1 页数据
if (!easierHis.getState()) {
  loadPage(1);      // 用于翻页和加载数据的方法
  easierHis.putState({page: 1});
}

// 浏览器前进/后退时，根据 state 数据加载对应页码的数据
easierHis.popState((state) => {
  let cur_page = !state ? 1 : parseInt(state.page);
  loadPage(cur_page);
});

// 加载或跳转某页的方法
function goto(page){
  loadPage(page);
  easierHis.putState({page: page});
}
```

### 6. 具体实现

从上一小节的需求出发，我们来看一看这个小工具（包）的具体实现。
这里直接看代码，行文思路和具体方法的用法，可以参考代码注释：

```js
/* 基于 ES5 的 easierHistory 实现 */
'use strict';

// 全局对象
var easierHistory = {};

/*
** @method putState : 实现 类PJAX 机制的辅助函数，用于在 history 菊花上插一刀
** @param {Object} state_content : 第 1 个参数(必填)，表示当前 state 的对象字面量
** @param {Boolean} sync_prior : 第 2 个参数(选填)，传 true 则优先使用方案 $1，反之直接使用方案 $2，默认值为 true
** @return {Object} _state : 返回 state
**
** $1 : 基于 history.pushState (绝大部分现代浏览器均支持)
** $2 : 通过操作 url 的 hash 字符串内容的方式来进行兼容
*/
easierHistory.putState = function (state_content, sync_prior) {
  var _state = arguments[0] || {};
  var _prior = typeof arguments[1] == 'undefined' ? true : arguments[1];

  // 拼接 search 和 hash 字符串
  var _search = '?';
  var _hash = '';
  for (var key in _state) {
    _search += key + '=' + _state[key] + '&';
    _hash += '#' + key + '=' + _state[key];
  }
  _search = _search.replace(/\&$|\?$/, '');

  // 根据浏览器支持情况，选择一种实现方式
  if (!history.pushState || !_prior) {
    location.hash = _hash;                       // $2 基于 location.hash 的实现
  } else {
    history.pushState(_state, '', _search);      // $1 基于 pushState 的实现
  }

  // 返回当前 state
  return _state;
}

/*
** @method getState_byHistory : 用于获取 history 状态
** @return {Object} curState : 当前 history 状态
*/
easierHistory.getState_byHistory = function () {
  if (history.state) {
    return history.state;
  }

  if (location.search) {
    return location.search.substring(1).split('&').reduce(function (curState, queryStr) {
      if (queryStr.indexOf('=') !== -1) {
        curState[queryStr.split('=')[0]] = queryStr.split('=')[1];
      }

      return curState;
    }, {});
  }

  return null;
};

/*
** @method getState_byHash : 将 location.hash 的内容解析为 json 对象
** @return {Object} curState : 转换后的 json 对象
*/
easierHistory.getState_byHash = function () {
  if (!location.hash) {
    return null;
  }

  return location.hash.split('#').reduce(function (curState, hashStr) {
    if (hashStr.indexOf('=') !== -1) {
      curState[hashStr.split('=')[0]] = hashStr.split('=')[1];
    }

    return curState;
  }, {});
};

easierHistory.getState = function () {
  return easierHistory.getState_byHistory() || easierHistory.getState_byHash();
};

/*
** @method popState : 给 window对象 绑定 popState 事件，若浏览器不支持则向下兼容 hashchange 事件
** @param {Function} cbFunc : 事件回调
*/
easierHistory.popState = function (cbFunc) {
  if (easierHistory.getState_byHistory()) {
    window.onpopstate = function () {          // 基于 popstate 方法的实现（html5 特性）
      cbFunc(easierHistory.getState());
    };
  } else {
    window.onhashchange = function () {        // 基于 hashchange 方法的实现（兼容性更强）
      cbFunc(easierHistory.getState());
    };
  }
};


module.exports = easierHistory;
```

当然，上面的代码可以直接在浏览器运行（直接使用 easierHistory对象），把 module.exports 语句去掉即可。
