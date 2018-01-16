import postList from './data.json';

export const fetchPost = postName =>
  postList.find(p => p.url.includes(postName));

export default postList;
