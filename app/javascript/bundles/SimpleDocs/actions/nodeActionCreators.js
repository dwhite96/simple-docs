export const CREATE_NODE = 'CREATE_NODE';
export const DELETE_NODE = 'DELETE_NODE';
export const ADD_CHILD = 'ADD_CHILD';
export const REMOVE_CHILD = 'REMOVE_CHILD';
export const SHOW_CHILDREN = 'SHOW_CHILDREN';
export const HIDE_CHILDREN = 'HIDE_CHILDREN';
export const CHANGE_CONTENTS_FETCHED_STATUS = 'CHANGE_CONTENTS_FETCHED_STATUS';

export * from './simpleDocsActionCreators';

export const createNode = (nodeId, name) => ({
  type: CREATE_NODE,
  nodeId,
  name
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
