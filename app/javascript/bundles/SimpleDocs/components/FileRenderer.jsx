import React from 'react';

const FileRenderer = ({ filenames }) => (
  <ul style={{ listStyleType: 'none' }}>
    {filenames.map(file =>
      <li key={file}>
        {file}
      </li>
    )}
  </ul>
);

export default FileRenderer;
