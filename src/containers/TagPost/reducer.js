import { fromJS } from 'immutable';
import * as at from './actionTypes';

const INITIAL_STATE = fromJS({
  tagName: '',
  postList: [],
  total: 0,
  loadMore: true,
});

const resetStateForTagChange = (state, tagName) =>
  state
    .update('tagName', () => tagName)
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
    case at.SET_TAG_NAME:
      return resetStateForTagChange(state, action.message);
    case at.FETCH_TAG_POST_LIST:
      return updateState(state, action.data);
    default:
      return state;
  }
};
