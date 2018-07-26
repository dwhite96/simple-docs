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

    const { removeChild, deleteNode, parentId, id } = this.props;
    removeChild(parentId, id);
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
    const { name, parentId, childIds } = this.props;

    return (
      <div>
        { name }
        {' '}
        {typeof parentId !== 'undefined' &&
          <a href="#" onClick={this.handleRemoveClick} // eslint-disable-line jsx-a11y/href-no-hash
             style={{ color: 'lightgray', textDecoration: 'none' }}>
            ×
          </a>
        }
        <ul>
          {childIds.map(this.renderChild)}
          <li key="add">
            <a href="#" // eslint-disable-line jsx-a11y/href-no-hash
              onClick={this.handleAddChildClick}
            >
              Add child
            </a>
          </li>
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
