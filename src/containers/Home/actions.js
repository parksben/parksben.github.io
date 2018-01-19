import * as at from './actionTypes';
import { fetchList } from 'posts';

export const resetPostList = () => ({
  type: at.RESET_POST_LIST,
});

export const fetchPostList = (perPage, page) => dispatch => {
  const postList = fetchList(perPage, page);
  dispatch({
    type: at.FETCH_POST_LIST,
    data: postList,
  });
};
