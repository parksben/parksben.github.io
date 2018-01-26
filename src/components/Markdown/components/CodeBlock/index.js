import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { highlight, languages } from 'prismjs';
import ReactHtmlParser from 'react-html-parser';
import 'prismjs/themes/prism.css';

export class HtmlComponent extends Component {
  static propTypes = {
    html: PropTypes.string.isRequired,
  };

  render() {
    return ReactHtmlParser(this.props.html);
  }
}

export class CodeBlock extends Component {
  static propTypes = {
    literal: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
  };

  render() {
    const html = highlight(this.props.literal, languages[this.props.language]);
    const cls = `language-${this.props.language}`;

    return (
      <pre className={cls}>
        <code className={cls}>
          <HtmlComponent html={html} />
        </code>
      </pre>
    );
  }
}

export default CodeBlock;
