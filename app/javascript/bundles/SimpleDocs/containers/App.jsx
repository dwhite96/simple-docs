import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ActionCable from 'actioncable';

import Node from './Node';
import { updateFolderNode } from '../actions/nodeActionCreators';

export class App extends Component {
  static propTypes = {
    updateFolderNode: PropTypes.func.isRequired
  };

  cable = ActionCable.createConsumer('/cable');
  subscription = false;

  componentDidMount() {
    const { updateFolderNode } = this.props;

    this.subscription = this.cable.subscriptions.create({
      channel: "FoldersChannel"
    }, {
      received: (data) => {
        updateFolderNode(data);
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

export default connect(null, { updateFolderNode })(App);
