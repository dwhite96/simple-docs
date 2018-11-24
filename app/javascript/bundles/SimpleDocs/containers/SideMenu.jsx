import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'underscore';
import { Menu, Divider } from 'semantic-ui-react';

import { selectTopLevelFolder } from '../actions/nodeActionCreators';

class SideMenu extends Component {
  static propTypes = {
    folderIds: PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired,
    folders: PropTypes.objectOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    selectTopLevelFolder: PropTypes.func.isRequired
  };

  state = { activeItem: this.props.folders[this.props.folderIds[0]].name };

  handleFolderClick = (folderId, e) => {
    e.preventDefault();
    const { name } = this.props.folders[folderId];

    if (this.state.activeItem !== name) {
      this.setState({ activeItem: name });

      const { selectTopLevelFolder } = this.props;
      selectTopLevelFolder(folderId);
    }
  };

  render() {
    const { activeItem } = this.state;
    const { folderIds, folders, currentlySelectedFolderId } = this.props;

    return (
      <Menu fluid secondary vertical>
        <Menu.Menu size='mini'>
          <li>
            <Menu.Item
              data-remote='true'
              rel='nofollow'
              href={`/folders/new?folder_id=${currentlySelectedFolderId}`}
            >
              New folder
            </Menu.Item>
          </li>
          <li>
            <Menu.Item
              data-remote='true'
              rel='nofollow'
              href={`/folders/${currentlySelectedFolderId}/files/new`}
            >
              Upload file
            </Menu.Item>
          </li>
        </Menu.Menu>
        <Divider />
        {folderIds.map((folderId) => {
          const { name } = folders[folderId]

          return (
            <li key={folderId}>
              <Menu.Item
                name={name}
                active={activeItem === name}
                onClick={(e) => this.handleFolderClick(folderId, e)}
              >
                {name}
              </Menu.Item>
            </li>
          );
        })}
        <li>
          <Menu.Item
            name='deleted files'
            active={activeItem === 'deleted files'}
            onClick={this.handleFolderClick}
          >
            Deleted files
          </Menu.Item>
        </li>
      </Menu>
    );
  };
};

const mapStateToProps = state => {
  const folderIds = state.topLevelFolderIds;

  return {
    folderIds: folderIds,
    folders: _.pick(state, ...folderIds),
    currentlySelectedFolderId: state.currentlySelectedTopLevelFolderId
  };
};

export default connect(mapStateToProps, { selectTopLevelFolder })(SideMenu);
