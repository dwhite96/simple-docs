import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';

import App from '../containers/App';
import '../stylesheets/simple_docs.scss';

const SimpleDocsApp = () => {
  const store = ReactOnRails.getStore('configureStore');

  return(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default SimpleDocsApp;
