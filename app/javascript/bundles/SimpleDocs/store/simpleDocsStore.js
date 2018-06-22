import { createStore } from 'redux';
import simpleDocsReducer from '../reducers/simpleDocsReducer';

const configureStore = (railsProps) => (
  createStore(simpleDocsReducer, railsProps)
);

export default configureStore;
