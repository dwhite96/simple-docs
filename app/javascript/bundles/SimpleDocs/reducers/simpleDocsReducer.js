import { combineReducers } from 'redux';

import {
  HELLO_WORLD_NAME_UPDATE,
  NEW_FOLDER_POST,
  NEW_FOLDER_SUCCESS,
  NEW_FOLDER_FAILURE,
  REQUEST_FOLDER_LIST,
  RECEIVE_FOLDER_LIST
} from '../constants/simpleDocsConstants';

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
    items: [],
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
        items: action.folderList,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
};

const simpleDocsReducer = combineReducers({ name, folderList });

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

  folderList: {
    isFetching: false,
    didInvalidate: false,
    lastUpdated: 1439478405547,
    items: [
      {
        id: number,
        name: 'string'
      },
      {
        id: number,
        name: 'string'
      }
    ]
  }
}
*/
