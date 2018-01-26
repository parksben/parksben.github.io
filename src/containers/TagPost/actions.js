import * as at from './actionTypes';
import { getPostInfo, fetchPostByTag } from 'posts';

export const fetchPostInfo = () => async dispatch => {
  const postInfo = await getPostInfo();
  dispatch({
    type: at.GET_POST_INFO,
    data: postInfo,
  });
};

export const setTagName = tagName => ({
  type: at.SET_TAG_NAME,
  message: tagName,
});

export const fetchTagPostList = (tagName, perPage, page) => async dispatch => {
  const postList = await fetchPostByTag(tagName, perPage, page);
  dispatch({
    type: at.FETCH_TAG_POST_LIST,
    data: postList,
  });
};
