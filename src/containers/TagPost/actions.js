import * as at from './actionTypes';
import { fetchPostByTag } from 'posts';

export const setTagName = tagName => ({
  type: at.SET_TAG_NAME,
  message: tagName,
});

export const fetchTagPostList = (tagName, perPage, page) => dispatch => {
  const postList = fetchPostByTag(tagName, perPage, page);
  dispatch({
    type: at.FETCH_TAG_POST_LIST,
    data: postList,
  });
};
