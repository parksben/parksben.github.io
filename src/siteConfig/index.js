const siteInfo = require('./site.json');

const logo = /^http(s)?/gi.test(siteInfo.avatar)
  ? siteInfo.avatar
  : require(`${siteInfo.avatar}`);

export default {
  ...siteInfo,
  avatar: logo,
};
