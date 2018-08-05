import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/nodeActionCreators';

export class Node extends Component {
  handleAddChildClick = e => {
    e.preventDefault();

    const { fetchFolderContents, id } = this.props;
    fetchFolderContents(id)
  };

  handleRemoveClick = e => {
    e.preventDefault();

    const { removeChild, deleteNode, id } = this.props;
    removeChild(id);
    deleteNode(id);
  };

  renderChild = childId => {
    const { id } = this.props;

    return (
      <li key={childId}>
        <ConnectedNode id={childId} parentId={id} />
      </li>
    );
  };

  render() {
    const { name, childIds } = this.props;

    return (
      <div>
        <a href="#" onClick={this.handleAddChildClick} // eslint-disable-line jsx-a11y/href-no-hash
           style={{ color: 'lightgray', textDecoration: 'none' }}>
          +
        </a>
        {' '}
        <a href="#" onClick={this.handleRemoveClick} // eslint-disable-line jsx-a11y/href-no-hash
           style={{ color: 'lightgray', textDecoration: 'none' }}>
          -
        </a>
        {' '}
        { name }
        <ul style={{ listStyleType: 'none' }}>
          {childIds.map(this.renderChild)}
        </ul>
      </div>
    );
  };
};

function mapStateToProps(state, ownProps) {
  return state[ownProps.id];
};

const ConnectedNode = connect(mapStateToProps, actions)(Node);
export default ConnectedNode;
