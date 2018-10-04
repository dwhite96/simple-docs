import React from 'react';

const FileRenderer = props => (
  <ul style={{ listStyleType: 'none' }}>
    {props.filenames.map(file =>
      <li key={file}>
        {file}
      </li>
    )}
  </ul>
);

export default FileRenderer;
