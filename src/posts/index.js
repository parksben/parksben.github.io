import { sortBy } from 'lodash';
import axios from 'axios';

let postInfo = {};
export const getPostInfo = async () => {
  if (!postInfo.data) {
    postInfo = await axios.get(`/stat.json?t=${Date.now()}`);
  }

  return postInfo.data;
};

let postList = {};
export const getPostList = async () => {
  if (!postList.data) {
    postList = await axios.get(`/data.json?t=${Date.now()}`);
  }

  return postList.data;
};

const PER_PAGE = 10;
const INIT_PAGE = 1;

export const fetchList = async (
  perPage = PER_PAGE,
  page = INIT_PAGE,
  isReverse = true
) => {
  const postList = await getPostList();

  const reverse = isReverse ? -1 : 1;
  const allPost = sortBy(postList, p => reverse * Date.parse(p.time));

  return {
    total: allPost.length,
    posts: allPost.slice(perPage * (page - 1), perPage * page),
    perPage,
    curPage: page,
  };
};

export const fetchPost = async postName => {
  const postList = await getPostList();

  return postList.find(p => p.url.includes(postName));
};

export const countAllTag = async () => {
  const postList = await getPostList();

  const tagList = [];
  postList.forEach(p => {
    p.tag.forEach(t => {
      if (!tagList.find(o => o.tag === t)) {
        tagList.push({
          tag: t,
          count: 1,
        });
      } else {
        const tagIdx = tagList.findIndex(o => o.tag === t);
        tagList[tagIdx].count += 1;
      }
    });
  });

  return sortBy(tagList, o => -o.count);
};

export const fetchPostByTag = async (
  tagName,
  perPage = PER_PAGE,
  page = INIT_PAGE,
  isReverse = true
) => {
  const postList = await getPostList();

  const reverse = isReverse ? -1 : 1;
  const result = postList.filter(p => p.tag.includes(tagName));
  const collection = sortBy(result, p => reverse * Date.parse(p.time));

  return {
    tagName,
    total: collection.length,
    posts: collection.slice(perPage * (page - 1), perPage * page),
    perPage,
    curPage: page,
  };
};

export default getPostList;
