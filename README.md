# Crablog

parksben's blog project

适合前端开发人员的React轻博客

> This is a blog project developed with Create-React-App and other awesome projects in github.

> You can use codes from this repository other than articles and images of my blog contents.

> 如有问题，可加微信：Xreaman，或在此项目提 issue 给我

## Demo

![parksben's blog](./preview.png)

我的博客：[矮大紧的日常](https://parksben.github.io)

## 功能特性

* 纯JS实现的单页面应用
* 线上环境为纯静态站点
* 使用 `markdown` 格式编辑文章
* 使用 `标签` 对文章进行分类，文章打包后自动分类
* 一键打包全部文章内容（`ToDo`: 自动打包功能正在实现...）
* 支持一键发布到 `github-page` ，也可 `build` 后部署到其他环境

## 开发环境

* 建议开发环境：node.js v8.5.0 以上版本

## 使用说明

### 1. 安装启动

* `clone` 本项目代码到你的本地目录
  * 请不要保留我的文章内容（请删除在 `src/posts/` 目录下的所有文章目录）
* 执行 `yarn` 命令安装全部依赖
* 执行 `yarn start` 启动开发环境（http://localhost:3000）

### 2. 站点配置

* 编辑 `src/siteConfig/site.json` 文件为你的站点信息（记得修改头像）
* 编辑 `public/manifest.json` 文件（pwa相关属性）

### 3. 创建文章

* 执行 `yarn new-post` 命令创建新的文章目录（在 `src/posts/` 目录下）
* 编辑你的文章，文章中引用的图片需放到相同的目录下
* 执行 `yarn compile` 可随时打包文章，打包成功后可正常浏览该文章

### 4. 发布到 github-page

* 编辑 `package.json` 文件中的 `homepage` 一项更改为你的 `github` 主页地址
  * 如：https://parksben.github.io
* 将本地代码 `push` 到你的 `github 博客仓库` 的 `blog` 分支（没有的话请创建一个）
* 执行 `yarn deploy` 即可一键发布到您的 `github` 主页

### 5. 其他环境部署

* 线上执行 `yarn build` 命令，站点的所有静态资源将打包到 `build` 目录下
* 将站点的入口配置到 `build` 目录下
