import siteInfo from './site.json';
import { fetchList, countAllTag } from 'posts';

export default {
  ...siteInfo,
  postCount: fetchList().total,
  tag: countAllTag(),
};
