import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { highlightAll } from 'prismjs';
import CodeBlock from './components/CodeBlock';
import ImageRenderer from './components/ImageRenderer';
import 'prismjs/themes/prism.css';

export class Markdown extends Component {
  static propTypes = {
    source: PropTypes.string.isRequired,
  };

  componentDidMount() {
    highlightAll();
  }

  componentDidUpdate(prevProps) {
    highlightAll();
  }

  render() {
    return (
      <ReactMarkdown
        source={this.props.source}
        renderers={{
          CodeBlock,
          image: ImageRenderer,
        }}
      />
    );
  }
}

export default Markdown;
