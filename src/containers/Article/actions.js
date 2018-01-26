import * as at from './actionTypes';
import { getPostInfo, fetchPost } from 'posts';

export const fetchPostInfo = () => async dispatch => {
  const postInfo = await getPostInfo();
  dispatch({
    type: at.GET_POST_INFO,
    data: postInfo,
  });
};

export const resetPostContent = () => ({
  type: at.RESET_POST_CONTENT,
});

export const fetchPostContent = postName => async dispatch => {
  const postContent = await fetchPost(postName);
  dispatch({
    type: at.FETCH_POST_CONTENT,
    data: postContent,
  });
};
