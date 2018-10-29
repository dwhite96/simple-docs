import React from 'react';
import { Icon } from 'semantic-ui-react';
import '../stylesheets/simple_docs.scss';

const FileRenderer = ({ filenames }) => (
  <ul>
    {filenames.map(file =>
      <li key={file} id='file-list'>
        <Icon name='file' />
        {' '}
        {file}
      </li>
    )}
  </ul>
);

export default FileRenderer;
