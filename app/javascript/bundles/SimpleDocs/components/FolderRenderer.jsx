import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

import FormModal from './FormModal';
import '../stylesheets/simple_docs.scss';

const FolderRenderer = ({ id, name }) => (
  <span>
    {name}
    {' '}
    <div id='folder-dropdown'>
      <Dropdown direction='left' icon='sidebar'>
        <Dropdown.Menu>
          <Dropdown.Item>
            <FormModal />
          </Dropdown.Item>
          <a className="item"
            data-remote="true"
            rel="nofollow"
            href={`/folders/${id}/files/new`}
          >
            Upload file
          </a>
          <Dropdown.Item text='Rename' description='ctrl + r' />
          <Dropdown.Item text='Make a copy' />
          <Dropdown.Item icon='folder' text='Move to folder' />
          <a className="item"
            data-remote="true"
            data-confirm="Are you sure?"
            rel="nofollow"
            data-method="delete"
            href={`/folders/${id}/`}
          >
            <Dropdown.Item icon='trash' text='Delete folder' />
          </a>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  </span>
);

FolderRenderer.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default FolderRenderer;
