import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

const FolderRenderer = ({ id, name }) => (
  <span>
    {' '}
    {name}
    <div id='item-dropdown'>
      <Dropdown direction='left' icon='sidebar'>
        <Dropdown.Menu>
          <a className='item'
            data-remote='true'
            rel='nofollow'
            href={`/folders/new?folder_id=${id}`}
          >
            <Dropdown.Item icon='folder' text=' New subfolder' />
          </a>
          <a className='item'
            data-remote='true'
            rel='nofollow'
            href={`/folders/${id}/files/new`}
          >
            Upload file
          </a>
          <a className='item'
            data-remote='true'
            rel='nofollow'
            href={`/folders/${id}/edit`}
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
            href={`/folders/${id}`}
          >
            <Dropdown.Item icon='trash' text=' Delete' />
          </a>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  </span>
);

FolderRenderer.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

export default FolderRenderer;
