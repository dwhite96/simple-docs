import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import api from '../middleware/api';
import simpleDocsReducer from '../reducers/simpleDocsReducer';

const loggerMiddleware = createLogger();

const configureStore = (railsProps) => {
  const newProps = { ...railsProps };

  return createStore(
    simpleDocsReducer,
    newProps,
    applyMiddleware(
      thunk,
      loggerMiddleware
    )
  )
};

export default configureStore;
