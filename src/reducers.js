import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import home from 'containers/Home/reducer';

export default asyncReducers =>
  combineReducers({
    home,
    routing: routerReducer,
    ...asyncReducers,
  });
