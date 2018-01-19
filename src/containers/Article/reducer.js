import { fromJS } from 'immutable';
import * as at from './actionTypes';

const INITIAL_STATE = fromJS({
  postContent: {},
});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case at.RESET_POST_CONTENT:
      return state.update('postContent', () => fromJS({}));
    case at.FETCH_POST_CONTENT:
      return state.update('postContent', () => fromJS(action.data));
    default:
      return state;
  }
};
