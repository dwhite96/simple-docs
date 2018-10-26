import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import api from '../middleware/api';
import reducers from '../reducers/index';

const logger = createLogger();

function generateRootFolderTree(railsProps) {
  const rootId = railsProps.id;
  console.log(railsProps)

  const obj1 = {
    [rootId]: {
      id: rootId,
      name: railsProps.name,
      filenames: railsProps.filenames,
      files: railsProps.files,
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
  const folderProps = generateRootFolderTree(railsProps);
  const newProps = { ...folderProps };
  console.log("Preloaded State:", newProps);

  return createStore(
    reducers,
    newProps,
    applyMiddleware(
      thunk,
      api,
      logger
    )
  );
};

export default configureStore;
