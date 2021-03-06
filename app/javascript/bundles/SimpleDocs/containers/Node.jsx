import React from 'react';
import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

import * as actions from '../actions/nodeActionCreators';
import FolderRenderer from '../components/FolderRenderer';
import FileRenderer from '../components/FileRenderer';

export class Node extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    childIds: PropTypes.array.isRequired,
    filenames: PropTypes.array,
    expanded: PropTypes.bool.isRequired,
    contentsFetched: PropTypes.bool.isRequired,
    fetchFolderContents: PropTypes.func.isRequired,
    showChildren: PropTypes.func.isRequired,
    hideChildren: PropTypes.func.isRequired
  };

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

  renderChild = childId => {
    const { id } = this.props;

    return (
      <li key={childId}>
        <ConnectedNode id={childId} parentId={id} />
      </li>
    );
  };

  render() {
    const { id, name, childIds, filenames, expanded } = this.props;

    if (expanded) {
      return (
        <Fragment>
          <div>
            <a href="#" onClick={this.handleCollapseClick} // eslint-disable-line jsx-a11y/href-no-hash
            >
              <Icon name='chevron down' />
            </a>
            {' '}
            <Icon name='folder open' />
            <FolderRenderer id={id} name={name} />
          </div>
          <ul>
            {childIds.map(this.renderChild)}
          </ul>
          <FileRenderer folder_id={id} filenames={filenames} />
        </Fragment>
      );
    } else {
      return (
        <div>
          <a href="#" onClick={this.handleExpandClick} // eslint-disable-line jsx-a11y/href-no-hash
          >
            <Icon name='chevron right' />
          </a>
          {' '}
          <Icon name='folder' />
          <FolderRenderer id={id} name={name} />
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
