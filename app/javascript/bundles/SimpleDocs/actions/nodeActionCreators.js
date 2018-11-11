import {
  CREATE_NODE,
  DELETE_NODE,
  UPDATE_NODE,
  ADD_CHILD,
  REMOVE_CHILD,
  SHOW_CHILDREN,
  HIDE_CHILDREN,
  UPDATE_FOLDER_NAME,
  UPDATE_FILE_LIST
} from '../constants/nodeConstants';

export * from './simpleDocsActionCreators';

export const createNode = (nodeId, name) => ({
  type: CREATE_NODE,
  nodeId,
  name
});

export const updateNode = (nodeId, data) => ({
  type: UPDATE_NODE,
  nodeId,
  data
});

export const deleteNode = (nodeId) => ({
  type: DELETE_NODE,
  nodeId
});

export const addChild = (nodeId, childId) => ({
  type: ADD_CHILD,
  nodeId,
  childId
});

export const removeChild = (nodeId, childId) => ({
  type: REMOVE_CHILD,
  nodeId,
  childId
});

export const showChildren = (nodeId) => ({
  type: SHOW_CHILDREN,
  nodeId
})

export const hideChildren = (nodeId) => ({
  type: HIDE_CHILDREN,
  nodeId
});

export const updateFolderName = (nodeId, name) => ({
  type: UPDATE_FOLDER_NAME,
  nodeId,
  name
});

export const updateFileList = (nodeId, filenames) => ({
  type: UPDATE_FILE_LIST,
  nodeId,
  filenames
});
