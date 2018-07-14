import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FolderList from '../components/FolderList';
import * as actions from '../actions/simpleDocsActionCreators';

// const FolderTree = () => {
//   const tree = {
//     0: {
//       id: 0,
//       counter: 0,
//       childIds: this.props.folderList
//     }
//   }

  // for (let i = 1; i < 2; i++) {
  //   let parentId = Math.floor(Math.pow(Math.random(), 2) * i)
  //   tree[i] = {
  //     id: i,
  //     counter: 0,
  //     childIds: []
  //   }
  //   tree[parentId].childIds.push(i)
  // }

//   return tree
// }

// FolderTree.propTypes = {
//   folderList: PropTypes.object.isRequired,
//   actions: PropTypes.object.isRequired
// }

const mapStateToProps = (state) => ({ root: state.root });

export default connect(mapStateToProps)(FolderList);
