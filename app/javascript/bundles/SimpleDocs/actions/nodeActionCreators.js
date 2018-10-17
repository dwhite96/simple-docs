import {
  CREATE_NODE,
  UPDATE_NODE,
  DELETE_NODE,
  ADD_CHILD,
  REMOVE_CHILD,
  SHOW_CHILDREN,
  HIDE_CHILDREN,
  APPEND_NEW_FILE
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
