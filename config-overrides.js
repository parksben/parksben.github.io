const fs = require('fs');
const path = require('path');

const srcList = fs.readdirSync(path.resolve('src/'));
const srcFile = srcList.filter(d => /\.js$/gi.test(d));

const alias = {};
srcList.forEach(d => {
  alias[d] = path.resolve(`src/${d}`);
});
srcFile.forEach(d => {
  alias[d.replace(/\.js$/gi, '')] = path.resolve(`src/${d}`);
});

module.exports = function override(config, env) {
  const newConf = {
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        ...alias,
      },
    },
  };

  return newConf;
};
