import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createReducer from 'reducers';

export default (history, initialState = {}) => {
  const store = createStore(
    createReducer(),
    initialState,
    compose(
      applyMiddleware(thunk, routerMiddleware(history)),
      process.env.NODE_ENV === 'development' &&
      typeof window === 'object' &&
      typeof window.devToolsExtension !== 'undefined'
        ? window.devToolsExtension()
        : f => f
    )
  );

  store.asyncReducers = {};

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('./reducers', () =>
        store.replaceReducer(createReducer())
      );
    }
  }

  return store;
};
