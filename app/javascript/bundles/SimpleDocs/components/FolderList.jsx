import PropTypes from 'prop-types';
import React from 'react';

import '../stylesheets/folder_list.scss';

export default class FolderList extends React.Component {
  static propTypes = {
    folderList: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.updateFolderList = this.updateFolderList.bind(this);
  }

  updateFolderList() {
    this.props.actions.fetchFolderList();
  }

  render() {
    return (
      <div id="folder">
        <div id="folder-list">
          <button
            onClick={this.updateAircraftList}
            type="button"
            value="Update Folder List">
            Update Folder List
          </button>

          <table>
            <thead>
              <tr>
                <th>Folder Name</th>
              </tr>
            </thead>

            <tbody>
              {this.props.folderList.contents.map((folder, i) =>
                <tr key={i}>
                  <td>{folder.name}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
