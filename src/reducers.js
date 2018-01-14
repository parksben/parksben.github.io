import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import demo from 'containers/Demo/reducer';

export default asyncReducers =>
  combineReducers({
    demo,
    routing: routerReducer,
    ...asyncReducers,
  });
