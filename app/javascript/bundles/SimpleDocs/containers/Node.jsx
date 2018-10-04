import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import * as actions from '../actions/nodeActionCreators';
import FolderRenderer from '../components/FolderRenderer';
import FileRenderer from '../components/FileRenderer';

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
          <FolderRenderer name={name} />
          <ul style={{ listStyleType: 'none' }}>
            {childIds.map(this.renderChild)}
          </ul>
          <FileRenderer filenames={filenames} />
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
          <FolderRenderer name={name} />
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
