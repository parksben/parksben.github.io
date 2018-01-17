import { sortBy } from 'lodash';
import postList from './data.json';

export const fetchList = (isReverse = true) => {
  const reverse = isReverse ? -1 : 1;
  return sortBy(postList, p => reverse * Date.parse(p.time));
};

export const fetchPost = postName =>
  postList.find(p => p.url.includes(postName));

export default postList;
