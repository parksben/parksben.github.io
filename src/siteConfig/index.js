import siteInfo from './site.json';
import { postCount, tagInfo } from 'posts/data.json';

export default {
  ...siteInfo,
  postCount,
  tag: tagInfo,
};
