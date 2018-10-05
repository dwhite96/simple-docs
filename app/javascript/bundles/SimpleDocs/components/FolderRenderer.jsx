import React from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';

import '../stylesheets/simple_docs.scss'

const FolderRenderer = props => (
  <span>
    {props.name}
    {' '}
    <div id='folder-dropdown'>
      <Dropdown direction='left' icon='sidebar'>
        <Dropdown.Menu>
          <Dropdown.Item text='New file' />
          <Dropdown.Item text='Rename' description='ctrl + r' />
          <Dropdown.Item text='Make a copy' />
          <Dropdown.Item icon='folder' text='Move to folder' />
          <Dropdown.Item icon='trash' text='Delete' />
        </Dropdown.Menu>
      </Dropdown>
    </div>
  </span>
);

export default FolderRenderer;
