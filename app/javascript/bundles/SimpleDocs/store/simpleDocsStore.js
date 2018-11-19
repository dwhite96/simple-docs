import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import api from '../middleware/api';
import reducers from '../reducers/index';

const logger = createLogger();

function generateDefaultFolderTree(railsProps) {
  console.log(railsProps)
  const defaultFolder = railsProps[Object.keys(railsProps)[0]];

  const obj1 = {
    [defaultFolder.id]: {
      id: defaultFolder.id,
      name: defaultFolder.name,
      filenames: defaultFolder.filenames,
      childIds: extractFolderIds(defaultFolder),
      expanded: true,
      contentsFetched: true
    }
  };

  const obj2 = defaultFolder.subfolders.reduce(function(acc, cur, i) {
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
    folder.subfolders.map(item => { return item.id; })
  );
};

const configureStore = (railsProps) => {
  const folderProps = generateDefaultFolderTree(railsProps);
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
