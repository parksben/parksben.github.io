import * as at from './actionTypes';
import { fetchPost } from 'posts';

export const resetPostContent = () => ({
  type: at.RESET_POST_CONTENT,
});

export const fetchPostContent = postName => dispatch => {
  const postContent = fetchPost(postName);
  dispatch({
    type: at.FETCH_POST_CONTENT,
    data: postContent,
  });
};
