// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import _ from 'underscore';
// import { Menu, Divider } from 'semantic-ui-react';

// import { selectTopLevelFolder } from '../actions/nodeActionCreators';

// class RightSideBar extends Component {
//   static propTypes = {
//     folderIds: PropTypes.arrayOf(
//       PropTypes.number.isRequired
//     ).isRequired,
//     folders: PropTypes.objectOf(
//       PropTypes.shape({
//         id: PropTypes.number.isRequired,
//         name: PropTypes.string.isRequired
//       }).isRequired
//     ).isRequired,
//     selectTopLevelFolder: PropTypes.func.isRequired
//   };

//   state = { activeItem: this.props.folders[this.props.folderIds[0]].name };

//   handleFolderClick = (folderId, e) => {
//     e.preventDefault();
//     const { name } = this.props.folders[folderId];

//     if (this.state.activeItem !== name) {
//       this.setState({ activeItem: name });

//       const { selectTopLevelFolder } = this.props;
//       selectTopLevelFolder(folderId);
//     }
//   };

//   render() {
//     const { activeItem } = this.state;
//     const { folderIds, folders, currentlySelectedFolderId } = this.props;

//     return (
//       <div id='side-bar'>
//         <div id='side-bar-menu'>
//           <Menu fluid secondary vertical inverted fixed={'left'}>
//             <div id='side-menu'>
//               <Menu.Menu size='mini'>
//                 <li>
//                   <Menu.Item
//                     data-remote='true'
//                     rel='nofollow'
//                     href={`/folders/new?folder_id=${currentlySelectedFolderId}`}
//                   >
//                     New folder
//                   </Menu.Item>
//                 </li>
//                 <li>
//                   <Menu.Item
//                     data-remote='true'
//                     rel='nofollow'
//                     href={`/folders/${currentlySelectedFolderId}/files/new`}
//                   >
//                     Upload file
//                   </Menu.Item>
//                 </li>
//               </Menu.Menu>
//               <Divider />
//               {folderIds.map((folderId) => {
//                 const { name } = folders[folderId]

//                 return (
//                   <li key={folderId}>
//                     <Menu.Item
//                       name={name}
//                       active={activeItem === name}
//                       onClick={(e) => this.handleFolderClick(folderId, e)}
//                     >
//                       {name}
//                     </Menu.Item>
//                   </li>
//                 );
//               })}
//               <li>
//                 <Menu.Item
//                   name='deleted files'
//                   active={activeItem === 'deleted files'}
//                   onClick={this.handleFolderClick}
//                 >
//                   Deleted files
//                 </Menu.Item>
//               </li>
//             </div>
//           </Menu>
//         </div>
//       </div>
//     );
//   };
// };

// const mapStateToProps = state => {
//   const folderIds = state.topLevelFolderIds;

//   return {
//     folderIds: folderIds,
//     folders: _.pick(state, ...folderIds),
//     currentlySelectedFolderId: state.currentlySelectedTopLevelFolderId
//   };
// };

// export default connect(mapStateToProps, { selectTopLevelFolder })(LeftSideBar);
import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Dropdown } from 'semantic-ui-react';

const RightSideBar = () => (
  <ul>
    {filenames.map((file, index) =>
      <li key={file}>
        <div>
          <span id='filename'>
            <Icon name='file' />
            {' '}
            {file}
          </span>
          <span className='item-dropdown'>
            <Dropdown direction='left' icon='sidebar'>
              <Dropdown.Menu>
                <a className='item'
                  rel='nofollow'
                >
                  <Dropdown.Item text='Download' />
                </a>
                <a className='item'
                  data-remote='true'
                  rel='nofollow'
                  href={`/folders/${folder_id}/files/${index}/edit`}
                >
                  <Dropdown.Item text='Rename' />
                </a>
                <a className='item'
                  rel='nofollow'
                >
                  <Dropdown.Item text='Make a copy' />
                </a>
                <a className='item'
                  rel='nofollow'
                >
                  <Dropdown.Item icon='folder' text=' Move to folder' />
                </a>
                <a className='item'
                  data-remote='true'
                  data-confirm='Are you sure?'
                  rel='nofollow'
                  data-method='delete'
                  href={`/folders/${folder_id}/files/${index}`}
                >
                  <Dropdown.Item icon='trash' text=' Delete' />
                </a>
              </Dropdown.Menu>
            </Dropdown>
          </span>
        </div>
      </li>
    )}
  </ul>



  <div id='side-bar'>
    <div id='side-bar-menu'>
      <Menu fluid secondary vertical inverted fixed={'left'}>
        <div id='side-menu'>
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
        </div>
      </Menu>
    </div>
  </div>
);

RightSideBar.propTypes = {
  folder_id: PropTypes.number.isRequired,
  filenames: PropTypes.array.isRequired
};

export default RightSideBar;
