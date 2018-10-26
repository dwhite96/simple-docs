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

// Update folder node.
export const updateFolderNode = folder => dispatch => {
  if (typeof folder === 'undefined') {
    return console.log(folder);
  }
  console.log(folder);

  const { createNode, addChild } = nodeActions;
  const childId = dispatch(createNode(folder.id, folder.name)).nodeId;
  dispatch(addChild(folder.folder_id, childId));
};

function createFolderNodes(id, data, dispatch) {
  data.contents.map(folder => {
    const { createNode, addChild } = nodeActions;
    const childId = dispatch(createNode(folder.id, folder.name)).nodeId;
    dispatch(addChild(id, childId));
  })
};

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

// Post a new file to Rails database;
const postNewFile = (id, file) => ({
  [CALL_API]: {
    types: [],
    url: `/folders/${id}/files.json`,
    method: 'POST',
    file
  }
});

// Upload new file thunk.
export const uploadFile = (id, file) => dispatch => {
  return dispatch(postNewFile(id, file))
  .then(response => {
    console.log(response);
  });
};

const appendNewFile = file => ({
  type: APPEND_NEW_FILE,
  file
});
