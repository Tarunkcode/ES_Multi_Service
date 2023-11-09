import logger from 'redux-logger';

import rootReducer from './root-reducer';

import { createStore, applyMiddleware } from 'redux';

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;