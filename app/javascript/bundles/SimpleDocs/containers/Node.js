import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import * as actions from '../actions/nodeActionCreators';

export class Node extends Component {
  handleAddChildClick = e => {
    e.preventDefault();

    const { contentsFetched, fetchFolderContents, showChildren, id } = this.props;

    // Currently checks if childIds array is empty or not. This will still fetch
    //  contents even is there are none in the current folder saved in the
    //  database. This is not the ideal behavior. Need to pass into props from
    //  rails whether or not a folder instance has any contents and check that here.
    if (!contentsFetched) {
      fetchFolderContents(id);
    } else {
      showChildren(id);
    }
  };

  handleRemoveClick = e => {
    e.preventDefault();

    const { hideChildren, removeChild, deleteNode, id } = this.props;
    hideChildren(id);
    // removeChild(id);
    // deleteNode(id);
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
    const { name, childIds, expanded } = this.props;

    if (expanded) {
      return (
        <div>
          <a href="#" onClick={this.handleRemoveClick} // eslint-disable-line jsx-a11y/href-no-hash
             style={{ color: 'lightgray', textDecoration: 'none' }}>
            <Icon name='chevron down' />
          </a>
          {' '}
          { name }
          <ul style={{ listStyleType: 'none' }}>
            {childIds.map(this.renderChild)}
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          <a href="#" onClick={this.handleAddChildClick} // eslint-disable-line jsx-a11y/href-no-hash
             style={{ color: 'lightgray', textDecoration: 'none' }}>
            <Icon name='chevron right' />
          </a>
          {' '}
          { name }
        </div>
      );
    }
  };
};

function mapStateToProps(state, ownProps) {
  return state[ownProps.id];
};

const ConnectedNode = connect(mapStateToProps, actions)(Node);
export default ConnectedNode;
