import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import * as actions from '../actions/nodeActionCreators';

export class Node extends Component {
  handleExpandClick = e => {
    e.preventDefault();

    const { contentsFetched, fetchFolderContents, showChildren, id } = this.props;

    // Currently checks if childIds array is empty or not. This will still fetch
    //  contents even is there are none in the current folder saved in the
    //  database. This is not the ideal behavior. Need to pass into props from
    //  rails whether or not a folder instance has any contents and check that here.
    if (contentsFetched) {
      showChildren(id);
    } else {
      fetchFolderContents(id);
    }
  };

  handleCollapseClick = e => {
    e.preventDefault();

    const { hideChildren, id } = this.props;
    hideChildren(id);
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

  renderFile = file => {
    return (
      <li key={file}>
        {file}
      </li>
    );
  };

  render() {
    const { name, childIds, filenames, expanded } = this.props;

    if (expanded) {
      return (
        <div>
          <a href="#" onClick={this.handleCollapseClick} // eslint-disable-line jsx-a11y/href-no-hash
             style={{ color: 'lightgray', textDecoration: 'none' }}>
            <Icon name='chevron down' />
          </a>
          {' '}
          { name }
          <ul style={{ listStyleType: 'none' }}>
            {childIds.map(this.renderChild)}
          </ul>
          <ul style={{ listStyleType: 'none' }}>
            {filenames.map(this.renderFile)}
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          <a href="#" onClick={this.handleExpandClick} // eslint-disable-line jsx-a11y/href-no-hash
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
