import React from 'react';
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

const FolderRenderer = ({ id, name }) => (
  <Fragment>
    <span>
      {' '}
      {name}
    </span>
    <span className='item-dropdown'>
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
            href={`/folders/${id}`}
          >
            <Dropdown.Item icon='trash' text=' Delete' />
          </a>
        </Dropdown.Menu>
      </Dropdown>
    </span>
  </Fragment>
);

FolderRenderer.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

export default FolderRenderer;
