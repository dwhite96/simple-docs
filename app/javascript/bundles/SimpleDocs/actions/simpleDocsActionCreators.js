/* eslint-disable import/prefer-default-export */
import fetch from 'cross-fetch'

import { CALL_API } from '../middleware/api';

import {
  CHANGE_CONTENTS_FETCHED_STATUS,
  FOLDER_CONTENTS_REQUEST,
  FOLDER_CONTENTS_SUCCESS,
  FOLDER_CONTENTS_FAILURE,
  NEW_FOLDER_REQUEST,
  NEW_FOLDER_SUCCESS,
  NEW_FOLDER_FAILURE,
  NEW_FILE_REQUEST,
  NEW_FILE_SUCCESS,
  NEW_FILE_FAILURE
} from '../constants/simpleDocsConstants';
import * as nodeActions from './nodeActionCreators';

export const changeContentsFetchedStatus = nodeId => ({
  type: CHANGE_CONTENTS_FETCHED_STATUS,
  nodeId
});

// Request folder contents from Rails database.
const requestFolderContents = id => ({
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
export const fetchFolderContents = id => dispatch => {
  const { showChildren, updateNode } = nodeActions;

  return dispatch(requestFolderContents(id))
  .then(response => {
    console.log(response);
    if (response.type === FOLDER_CONTENTS_SUCCESS) {
      createFolderNodes(id, response.data, dispatch);
      dispatch(changeContentsFetchedStatus(id));
      dispatch(updateNode(id, response.data));
      dispatch(showChildren(id));
    }
  });
};

function createFolderNodes(id, data, dispatch) {
  data.subfolders.map(folder => {
    const { createNode, addChild } = nodeActions;
    const childId = dispatch(createNode(folder.id, folder.name)).nodeId;
    dispatch(addChild(id, childId));
  })
};

// export const updateFolderNode = folder => dispatch => {
//   if (typeof folder === 'undefined') {
//     return console.log(folder);
//   }

//   if (typeof folder.name === 'undefined') {
//     return deleteFolderNode(folder.id, folder.folder_id, dispatch);
//   }

//   const { createNode, addChild } = nodeActions;

//   const childId = dispatch(createNode(folder.id, folder.name)).nodeId;
//   dispatch(addChild(folder.folder_id, childId));
// };

// function deleteFolderNode(id, parentId, dispatch) {
//   const { removeChild, deleteNode } = nodeActions;
//   dispatch(removeChild(parentId, id));
//   dispatch(deleteNode(id));
// };

// May use the following actions in the future if cable connection
//  is made via middleware.
// // Action creator with received function:
// export const subscribeFeed = feedId => {
//   return dispatch => dispatch({
//     channel: 'FoldersChannel',
//     feed: `feed_${feedId}`,
//     received: data => dispatch({
//       type: NEW_DATA,
//       payload: data
//     }),
//   });
// };

// // Unsubscribe to FoldersChannel feed.
// export const unsubscribeFeed = feedId => ({
//   channel: 'FoldersChannel',
//   feed: `feed_${feedId}`,
//   leave: true
// });

// Post a new folder to Rails database.
const postNewFolder = folder => ({
  [CALL_API]: {
    types: [ NEW_FOLDER_REQUEST, NEW_FOLDER_SUCCESS, NEW_FOLDER_FAILURE ],
    url: '/folders.json',
    method: 'POST',
    folder
  }
});

// Submit new folder thunk.
export const submitNewFolder = folder => dispatch => {
  return dispatch(postNewFolder(folder))
  .then(response => {
    console.log(response);
    if (response.type === NEW_FOLDER_SUCCESS) {
      dispatch(createNode().nodeId);
    }
  });
};
