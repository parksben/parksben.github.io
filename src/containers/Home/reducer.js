import { fromJS } from 'immutable';
import * as at from './actionTypes';

const INITIAL_STATE = fromJS({
  postList: [],
  total: 0,
  loadMore: true,
});

const resetState = state =>
  state
    .update('postList', () => [])
    .update('total', () => 0)
    .update('loadMore', () => true);

const updateState = (state, data) => {
  const curList = state.toJS().postList.concat(data.posts);

  return state
    .update('postList', postList => fromJS(curList.map(p => fromJS(p))))
    .update('total', total => data.total)
    .update(
      'loadMore',
      loadMore => (data.perPage * data.curPage >= data.total ? false : true)
    );
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case at.RESET_POST_LIST:
      return resetState(state);
    case at.FETCH_POST_LIST:
      return updateState(state, action.data);
    default:
      return state;
  }
};
