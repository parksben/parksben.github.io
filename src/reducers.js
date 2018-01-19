import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import home from 'containers/Home/reducer';
import tagPost from 'containers/TagPost/reducer';
import article from 'containers/Article/reducer';

export default asyncReducers =>
  combineReducers({
    home,
    tagPost,
    article,
    routing: routerReducer,
    ...asyncReducers,
  });
