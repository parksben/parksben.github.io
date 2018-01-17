const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const moment = require('moment');
const postSample = require('./postSample.json');

const questions = [
  {
    type: 'input',
    name: 'post_name',
    message: '请输入您的文章别名（用于创建文章目录，仅限英文，单词间用短横杠‘-’连接）：',
    validate: value => {
      if (/(\.|\*|\?|\\|\/)/gi.test(value)) {
        return '文章别名不得包含特殊符号（.*?\\/），请重新输入↑↑';
      }

      if (/(([A-z]+-)+)?[A-z]+/gi.test(value)) {
        return true;
      }

      return '文章别名不合法，请重新输入↑↑';
    },
    filter: value => value.replace(/\s+/gi, '-'),
  },
  {
    type: 'input',
    name: 'create_at',
    message: '请输入文章的发布时间（或者按回车键使用默认值）：',
    default: () => {
      return moment().format('YYYY-MM-DDThh:mm:ss');
    },
    validate: value => {
      if (/\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d/gi.test(value)) {
        return true;
      }

      return '时间格式不合法，请重新输入↑↑';
    },
  },
];

inquirer
  .prompt(questions)
  .then(answers => {
    const { post_name, create_at } = answers;
    const postDirName = `src/posts/${create_at}_${post_name}/`;

    if (fs.existsSync(path.resolve(postDirName))) {
      console.log('文章已存在，请直接编辑！');
    } else {
      // 创建文章目录
      fs.mkdirSync(path.resolve(postDirName));
      // 写入md
      fs.writeFileSync(
        path.resolve(`${postDirName}article.md`),
        postSample.md,
        'utf-8'
      );
      // 写入缩略图（thumb.jpg）
      const base64Data = postSample.thumb.replace(
        /data:image\/\w+;base64,/i,
        ''
      );
      const dataBuffer = new Buffer(base64Data, 'base64');
      fs.writeFileSync(path.resolve(`${postDirName}thumb.jpg`), dataBuffer);

      console.log(
        `\n文章目录：\`${postDirName}\` 已创建，您可以愉快地编辑文章了！\n编辑完成后请使用 \`yarn compile\` 命令构建文章（自动构建功能正在努力开发中...）`
      );
    }
  })
  .catch(err => {
    console.log(err);
    console.log('您的人品余额不足，文章目录创建失败了...');
  });
