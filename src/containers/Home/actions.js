import axios from 'axios';
import * as at from './actionTypes';

export const fetchHome = () => async dispatch => {
  const response = await axios.get('/siteInfo.json');

  dispatch({
    type: at.HOME_FETCH_DATA,
    message: response.data,
  });
};

export const fetchPostList = () => async dispatch => {
  const response = await axios.get('/posts.json');

  dispatch({
    type: at.HOME_FETCH_POST_LIST,
    message: response.data,
  });
};
