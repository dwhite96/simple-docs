import React, { Component } from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';

export default class SideMenu extends Component {
  state = { activeItem: 'documents' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu fluid secondary vertical>
        <Menu.Item
          name='documents'
          active={activeItem === 'documents'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='photos'
          active={activeItem === 'photos'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='deleted files'
          active={activeItem === 'deleted files'}
          onClick={this.handleItemClick}
        />
      </Menu>
    );
  };
};
