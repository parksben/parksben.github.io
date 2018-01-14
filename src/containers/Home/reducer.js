import { fromJS } from 'immutable';
import * as at from './actionTypes';

const INITIAL_STATE = fromJS({
  hello: {},
});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case at.DEMO_FETCH_DATA:
      return state.update('hello', () => fromJS(action.message));
    default:
      return state;
  }
};
