import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import api from '../middleware/api';
import reducer from '../reducers/index';

const loggerMiddleware = createLogger();

function alignIds(railsProps) {
  const obj1 = { node: railsProps.node };

  const obj2 = railsProps.folders.reduce(function(acc, cur, i) {
    cur.childIds = [];
    acc[cur.id] = cur;
    return acc;
  }, {});

  return Object.assign({}, obj1, obj2);
};

const configureStore = (railsProps) => {
  const alignedProps = alignIds(railsProps);
  const newProps = { ...alignedProps };

  return createStore(
    reducer,
    newProps,
    applyMiddleware(
      thunk,
      loggerMiddleware
    )
  );
};

export default configureStore;
