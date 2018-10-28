import React from 'react';
import { Icon } from 'semantic-ui-react';

const FileRenderer = ({ filenames }) => (
  <ul style={{ listStyleType: 'none' }}>
    {filenames.map(file =>
      <li key={file}>
        <span>
          <Icon name='file' />
          {' '}
          {file}
        </span>
      </li>
    )}
  </ul>
);

export default FileRenderer;
