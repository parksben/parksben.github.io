import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default asyncReducers =>
  combineReducers({
    routing: routerReducer,
    ...asyncReducers,
  });
