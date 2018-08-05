import { combineReducers } from 'redux';

import {
  NEW_FOLDER_POST,
  NEW_FOLDER_SUCCESS,
  NEW_FOLDER_FAILURE,
  REQUEST_FOLDER_LIST,
  RECEIVE_FOLDER_LIST
} from '../constants/simpleDocsConstants';
import node from './index';

const folderList = (
  state = {
    isFetching: false,
    contents: [],
    lastUpdated: Date.now()
  },
  action
) => {
  switch (action.type) {
    case REQUEST_FOLDER_LIST:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_FOLDER_LIST:
      return {
        ...state,
        isFetching: false,
        contents: action.folderList,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
};

const simpleDocsReducer = combineReducers({ folderList, node });

export default simpleDocsReducer;

/*
Redux state shape:

The state shape should be normalized if any relational data/associations or
user interaction is added to the state shape. See
https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape for more.

Domain data and application state shape:

{
  folder: {
    isPosting: false,
    data: {}
  },
  folders: {
    isFetching: false,
    byId: {
      1: {
        id: 1,
        name: "string",
        childIds: [10, 11, 15, 17]
      },
      2: {
        id: 2,
        name: "string",
        childIds: [12, 13, 14]
      }
    },
    allIds: [1, 2]
  },
  files: {
    byId: {
      1: {
        id: 1,
        name: "string"
      },
      2: {
        id: 2,
        name: "string"
      }
    },
    allIds: [1, 2]
  }
}

ui state shape:
  A top level folder would be myDocuments, myPictures, myVideos, etc.

{
  ui: {
    initial uiState: {
      "myDocuments": [
        {
          name: "folder1"
        },
        {
          name: "folder2"
        }
      ]
    },
    second uiState: {
      "myDocuments": [
        {
          name: "folder1",
          subFolders: [
            {
              name: "folder10"
            },
            {
              name: "folder11"
            },
            {
              name: "file15"
            },
            {
              name: "file17"
            }
          ]
        },
        {
          name: "folder2"
        }
      ]
    }
  }
}
*/
