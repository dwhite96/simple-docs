import {
  ADD_CHILD,
  REMOVE_CHILD,
  CREATE_NODE,
  UPDATE_NODE,
  DELETE_NODE,
  SHOW_CHILDREN,
  HIDE_CHILDREN,
  CHANGE_CONTENTS_FETCHED_STATUS,
  UPDATE_FOLDER_NAME,
  APPEND_NEW_FILE
} from '../constants/nodeConstants';

const childIds = (state, action) => {
  switch (action.type) {
    case ADD_CHILD:
      return [ ...state, action.childId ];
    case REMOVE_CHILD:
      return state.filter(id => id !== action.childId);
    default:
      return state;
  };
};

const node = (state, action) => {
  switch (action.type) {
    case CREATE_NODE:
      return {
        id: action.nodeId,
        name: action.name,
        filenames: [],
        files: [],
        childIds: [],
        expanded: false,
        contentsFetched: false
      };
    case UPDATE_NODE:
      return { ...state, ...action.data };
    case ADD_CHILD:
    case REMOVE_CHILD:
      return {
        ...state,
        childIds: childIds(state.childIds, action)
      };
    case SHOW_CHILDREN:
      return { ...state, expanded: true };
    case HIDE_CHILDREN:
      return { ...state, expanded: false };
    case CHANGE_CONTENTS_FETCHED_STATUS:
      return { ...state, contentsFetched: true };
    case UPDATE_FOLDER_NAME:
      return { ...state, name: action.name };
    case APPEND_NEW_FILE:
      return {
        ...state,
        // Currently updates all filenames under a folder. It's a little
        //  complex, but would like to actually append new files only.
        filenames: action.filenames
      };
    default:
      return state;
  };
};

const getAllDescendantIds = (state, nodeId) => (
  state[nodeId].childIds.reduce((acc, childId) => (
    [ ...acc, childId, ...getAllDescendantIds(state, childId) ]
  ), [])
);

const deleteMany = (state, ids) => {
  state = { ...state };
  ids.forEach(id => delete state[id]);
  return state;
};

export default (state = {}, action) => {
  const { nodeId } = action;
  if (typeof nodeId === 'undefined') {
    return state;
  };

  if (action.type === DELETE_NODE) {
    const descendantIds = getAllDescendantIds(state, nodeId);
    console.log(descendantIds);
    return deleteMany(state, [ nodeId, ...descendantIds ]);
  };

  return {
    ...state,
    [nodeId]: node(state[nodeId], action)
  };
};
