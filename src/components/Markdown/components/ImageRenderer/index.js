import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ImageRenderer extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
  };

  render() {
    return <img src={this.props.src} alt={this.props.src} />;
  }
}

export default ImageRenderer;
