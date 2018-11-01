import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ActionCable from 'actioncable';

import Node from './Node';
import * as actions from '../actions/nodeActionCreators';

export class App extends Component {
  static propTypes = {
    createNode: PropTypes.func.isRequired,
    addChild: PropTypes.func.isRequired,
    updateFolderName: PropTypes.func.isRequired,
    removeChild: PropTypes.func.isRequired,
    deleteNode: PropTypes.func.isRequired
  };

  cable = ActionCable.createConsumer('/cable');
  subscription = false;

  handleReceivedData(data) {
    const {
      createNode,
      addChild,
      updateFolderName,
      removeChild,
      deleteNode
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
    return (
      <div>
        <hr />
        <Node id='1' />
        <hr />
      </div>
    );
  };
};

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps, actions)(App);
