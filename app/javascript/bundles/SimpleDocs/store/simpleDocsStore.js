import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import api from '../middleware/api';
import reducer from '../reducers/index';

const loggerMiddleware = createLogger();

function generateRootFolderTree(railsProps) {
  const rootId = railsProps.id

  const obj1 = {
    [rootId]: {
      id: rootId,
      name: railsProps.name,
      childIds: extractFolderIds(railsProps),
      expanded: true,
      contentsFetched: true
    }
  };

  const obj2 = railsProps.contents.reduce(function(acc, cur, i) {
    acc[cur.id] = cur;
    cur.childIds = [];
    cur.expanded = false;
    cur.contentsFetched = false;
    return acc;
  }, {});

  return Object.assign({}, obj1, obj2);
};

function extractFolderIds(folder) {
  return (
    folder.contents.map(item => { return item.id; })
  );
};

const configureStore = (railsProps) => {
  console.log(railsProps)

  const folderProps = generateRootFolderTree(railsProps);
  const newProps = { ...folderProps };

  console.log("Reducer", reducer);
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
