import ReactOnRails from 'react-on-rails';

import SimpleDocsApp from '../bundles/SimpleDocs/startup/SimpleDocsApp';
import configureStore from  '../bundles/SimpleDocs/store/simpleDocsStore';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({ SimpleDocsApp });

ReactOnRails.registerStore({ configureStore });
