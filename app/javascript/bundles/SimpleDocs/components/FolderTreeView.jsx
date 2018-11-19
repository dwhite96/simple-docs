import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Node from '../containers/Node';
import FileRenderer from './FileRenderer';

const FolderTreeView = ({ id, childIds, filenames }) => (
  <div>
    <ul style={{ position: 'relative', left: '-45px' }}>
      {childIds.map(childId => (
        <li key={childId}>
          <Node id={childId} parentId={id} />
        </li>
      ))}
    </ul>
    <div style={{ position: 'relative', left: '-22px' }}>
      <FileRenderer folder_id={id} filenames={filenames} />
    </div>
  </div>
);

FolderTreeView.propTypes = {
  id: PropTypes.number.isRequired,
  childIds: PropTypes.array.isRequired,
  filenames: PropTypes.array.isRequired
};

export default FolderTreeView;
