import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Dropdown } from 'semantic-ui-react';

const FileRenderer = ({ folder_id, filenames }) => (
  <ul>
    {filenames.map((file, index) =>
      <li key={file}>
        <span>
          <Icon name='file' />
          {' '}
          {file}
          <div id='item-dropdown-file'>
            <Dropdown direction='left' icon='sidebar'>
              <Dropdown.Menu>
                <Dropdown.Item text='Download' />
                <a className='item'
                  data-remote='true'
                  rel='nofollow'
                  href={`/folders/${folder_id}/files/${index}/edit`}
                >
                  <Dropdown.Item text='Rename' />
                </a>
                <Dropdown.Item text='Make a copy' />
                <Dropdown.Item icon='folder' text='Move to folder' />
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
          </div>
        </span>
      </li>
    )}
  </ul>
);

FileRenderer.propTypes = {
  folder_id: PropTypes.number.isRequired,
  filenames: PropTypes.array.isRequired
};

export default FileRenderer;
