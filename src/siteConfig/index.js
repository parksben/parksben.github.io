import siteInfo from './site.json';
import { countAllTag } from 'posts';

export default {
  ...siteInfo,
  tag: countAllTag(),
};
