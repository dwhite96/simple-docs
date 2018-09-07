/* eslint-disable import/prefer-default-export */
import { CALL_API } from '../middleware/api';

import {
  CHANGE_CONTENTS_FETCHED_STATUS,
  FOLDER_CONTENTS_REQUEST,
  FOLDER_CONTENTS_SUCCESS,
  FOLDER_CONTENTS_FAILURE,
  NEW_FOLDER_REQUEST,
  NEW_FOLDER_SUCCESS,
  NEW_FOLDER_FAILURE
} from '../constants/simpleDocsConstants';
import * as nodeActions from './nodeActionCreators';

export const changeContentsFetchedStatus = (nodeId) => ({
  type: CHANGE_CONTENTS_FETCHED_STATUS,
  nodeId
});

// Request folder contents from Rails database.
const requestFolderContents = (id) => ({
  [CALL_API]: {
    types: [
      FOLDER_CONTENTS_REQUEST,
      FOLDER_CONTENTS_SUCCESS,
      FOLDER_CONTENTS_FAILURE
    ],
    url: `/folders/${id}.json`,
    method: 'GET'
  }
});

// Fetch folder contents thunk.
export const fetchFolderContents = (id) => (dispatch) => {
  const { showChildren } = nodeActions;
  return dispatch(requestFolderContents(id))
  .then(response => {
    console.log(response)
    if (response.type === FOLDER_CONTENTS_SUCCESS) {
      createFolderNodes(id, response.data, dispatch);
      dispatch(changeContentsFetchedStatus(id));
      dispatch(showChildren(id));
    }
  });
};

function createFolderNodes(id, data, dispatch) {
  data.map(folder => {
    const { createNode, addChild } = nodeActions;
    const childId = dispatch(createNode(folder.id, folder.name)).nodeId;
    dispatch(addChild(id, childId));
  })
};

// Post a new folder to Rails database.
const postNewFolder = (folder) => ({
  [CALL_API]: {
    types: [ NEW_FOLDER_REQUEST, NEW_FOLDER_SUCCESS, NEW_FOLDER_FAILURE ],
    url: '/folders.json',
    method: 'POST',
    folder
  }
});

// Submit new folder thunk.
export const submitNewFolder = (folder) => (dispatch) => {
  return dispatch(postNewFolder(folder))
    .then(response => {
    console.log(response)
    if (response.type === NEW_FOLDER_SUCCESS) {
      dispatch(createNode().nodeId)
    }
  });
};
