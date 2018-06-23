import { connect } from 'react-redux';
import FolderList from '../components/FolderList';
import * as actions from '../actions/simpleDocsActionCreators';

// Which part of the Redux global state does our component want to receive as props?
const mapStateToProps = (state) => ({ name: state.name });

export default connect(mapStateToProps, actions)(FolderList);
