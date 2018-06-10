import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Main extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    return (
      <div id="app-root">
        {this.props.children}
      </div>
    );
  }
}