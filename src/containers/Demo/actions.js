import axios from 'axios';
import * as at from './actionTypes';

export const fetchDemo = () => async dispatch => {
  const response = await axios.get('/data/hello.json');

  dispatch({
    type: at.DEMO_FETCH_DATA,
    message: response.data,
  });
};
