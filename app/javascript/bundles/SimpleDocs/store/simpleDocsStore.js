import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import api from '../middleware/api';
import reducer from '../reducers/index';

const loggerMiddleware = createLogger();

function generateRootFolderTree(railsProps) {
  const obj1 = {
    node: {
      id: "node",
      name: "My Docs",
      childIds: extractFolderIds(railsProps)
    }
  };

  const obj2 = railsProps.reduce(function(acc, cur, i) {
    cur.childIds = [];
    acc[cur.id] = cur;
    return acc;
  }, {});

  return Object.assign({}, obj1, obj2);
};

function extractFolderIds(railsProps) {
  return (
    railsProps.map(folder => { return folder.id; })
  );
};

const configureStore = (railsProps) => {
  const folderProps = generateRootFolderTree(railsProps);
  const newProps = { ...folderProps };

  console.log("Preloaded State:", newProps);

  return createStore(
    reducer,
    newProps,
    applyMiddleware(
      thunk,
      api,
      loggerMiddleware
    )
  );
};

export default configureStore;
