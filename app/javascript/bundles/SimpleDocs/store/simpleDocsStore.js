import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import api from '../middleware/api';
import reducers from '../reducers/index';

const logger = createLogger();

function buildPreloadedState(railsProps) {
  const obj = buildTopLevelFolderObjects(railsProps.data);
  const defaultFolder = {
    currentlySelectedTopLevelFolderId: obj[Object.keys(obj)[0]].id
  };
  return Object.assign({}, obj, defaultFolder);
};

function buildTopLevelFolderObjects(folders) {
  const topLevelFolderIds = { topLevelFolderIds: [] };

  return folders.reduce(function(acc, folder) {
    const obj1 = {
      [folder.id]: {
        id: folder.id,
        name: folder.name,
        filenames: folder.filenames,
        childIds: []
      }
    };

    const obj2 = buildSubfolderObjects(folder.subfolders);

    function buildSubfolderObjects(subfolders) {
      return subfolders.reduce(function(acc, subfolder) {
        const obj3 = {
          [subfolder.id]: {
            id: subfolder.id,
            name: subfolder.name,
            childIds: [],
            expanded: false,
            contentsFetched: false
          }
        };

        obj1[Object.keys(obj1)[0]].childIds.push(subfolder.id);

        return Object.assign({}, acc, obj3);
      }, {});
    };

    topLevelFolderIds.topLevelFolderIds.push(folder.id);
    return Object.assign({}, acc, topLevelFolderIds, obj1, obj2);
  }, {});
};

const configureStore = railsProps => {
  console.log(railsProps);
  const defaultFolderProps = buildPreloadedState(railsProps);
  const newProps = { ...defaultFolderProps };
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
