import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Menu } from 'semantic-ui-react';

export default class SideMenu extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  };

  state = { activeItem: 'documents' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const { name } = this.props;

    return (
      <Menu fluid secondary vertical>
        <Menu.Item
          name={name}
          active={activeItem === {name}}
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
