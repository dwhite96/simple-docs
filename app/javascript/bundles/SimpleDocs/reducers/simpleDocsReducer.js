import { combineReducers } from 'redux';

import {
  HELLO_WORLD_NAME_UPDATE,
  NEW_FOLDER_POST,
  NEW_FOLDER_SUCCESS,
  NEW_FOLDER_FAILURE,
  REQUEST_FOLDER_LIST,
  RECEIVE_FOLDER_LIST
} from '../constants/simpleDocsConstants';
import node from './index';

const name = (state = '', action) => {
  switch (action.type) {
    case HELLO_WORLD_NAME_UPDATE:
      return action.text;
    default:
      return state;
  }
};

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

const simpleDocsReducer = combineReducers({ name, folderList, node });

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
        name: 'string',
        contents: [10, 11, 15, 17]
      },
      2: {
        id: 2,
        name: 'string',
        contents: [12, 13, 14]
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
*/