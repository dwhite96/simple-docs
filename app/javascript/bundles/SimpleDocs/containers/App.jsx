import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ActionCable from 'actioncable';
import { Grid, Divider } from 'semantic-ui-react';
import _ from 'underscore';

import SideMenu from './SideMenu';
import FolderTreeView from '../components/FolderTreeView';
import * as actions from '../actions/nodeActionCreators';

export class App extends Component {
  static propTypes = {
    currentlySelectedTopLevelFolderId: PropTypes.number.isRequired,
    createNode: PropTypes.func.isRequired,
    addChild: PropTypes.func.isRequired,
    updateFolderName: PropTypes.func.isRequired,
    removeChild: PropTypes.func.isRequired,
    deleteNode: PropTypes.func.isRequired,
    updateFileList: PropTypes.func.isRequired
  };

  cable = ActionCable.createConsumer('/cable');
  subscription = false;

  handleReceivedData(data) {
    console.log(data);

    const {
      createNode,
      addChild,
      updateFolderName,
      removeChild,
      deleteNode,
      updateFileList
    } = this.props;

    switch (data.type) {
      case 'CREATE_NODE':
        const childId = createNode(data.id, data.name).nodeId;
        return addChild(data.folder_id, childId);
      case 'UPDATE_NODE':
        return updateFolderName(data.id, data.name);
      case 'DELETE_NODE':
        removeChild(data.folder_id, data.id);
        return deleteNode(data.id);
      case 'UPDATE_FILE_LIST':
        return updateFileList(data.id, data.filenames);
      default:
        return;
    };
  };

  componentDidMount() {
    this.subscription = this.cable.subscriptions.create({
      channel: "FoldersChannel"
    }, {
      received: (data) => {
        this.handleReceivedData(data);
      }
    });
  };

  render() {
    const { currentlySelectedTopLevelFolderId } = this.props;
    const selectedFolder = this.props[currentlySelectedTopLevelFolderId];
    const { id, childIds, filenames } = selectedFolder;

    return (
      <Grid divided>
        <Grid.Column width={2}>
          <SideMenu />
        </Grid.Column>
        <Grid.Column stretched width={12}>
          <FolderTreeView id={id} childIds={childIds} filenames={filenames} />
        </Grid.Column>
      </Grid>
    );
  };
};

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, actions)(App);
