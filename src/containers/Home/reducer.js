import { fromJS } from 'immutable';
import * as at from './actionTypes';

const INITIAL_STATE = fromJS({
  home: {},
  postList: [],
});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case at.HOME_FETCH_DATA:
      return state.update('home', () => fromJS(action.message));
    case at.HOME_FETCH_POST_LIST:
      return state.update('postList', () =>
        fromJS(action.message.map(p => fromJS(p)))
      );
    default:
      return state;
  }
};
