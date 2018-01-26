import * as at from './actionTypes';
import { getPostInfo, fetchList } from 'posts';

export const fetchPostInfo = () => async dispatch => {
  const postInfo = await getPostInfo();
  dispatch({
    type: at.GET_POST_INFO,
    data: postInfo,
  });
};

export const resetPostList = () => ({
  type: at.RESET_POST_LIST,
});

export const fetchPostList = (perPage, page) => async dispatch => {
  const postList = await fetchList(perPage, page);
  dispatch({
    type: at.FETCH_POST_LIST,
    data: postList,
  });
};
