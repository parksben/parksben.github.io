import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { randomId } from 'utils';
import './style.css';

export class SideBar extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  renderTag(tag) {
    const items = tag.map(t =>
      <p className="tag" key={`tag_${t}`}>
        {t}
      </p>
    );

    return (
      <div className="tag-container">
        {items}
      </div>
    );
  }

  renderSocialLink(data) {
    const items = data.map(d =>
      <li key={`social_${randomId()}`}>
        <a href={d.link} className="link">
          {d.text}
        </a>
      </li>
    );

    return (
      <ul className="links">
        {items}
      </ul>
    );
  }

  render() {
    if (!this.props.data.title) {
      return false;
    }

    const {
      avatar,
      title,
      subTitle,
      intro,
      tag,
      social,
      copyright,
    } = this.props.data;

    return (
      <header id="header">
        <div className="inner">
          <div
            className="avatar"
            style={{ backgroundImage: `url(${avatar})` }}
          />
          <h1>
            {title}
          </h1>
          <h2>
            {subTitle}
          </h2>
          <p>
            {intro}
          </p>
          {this.renderTag(tag)}
        </div>
        <footer id="footer">
          <div className="inner">
            {this.renderSocialLink(social)}
            <p className="copyright">
              {copyright}
            </p>
          </div>
        </footer>
      </header>
    );
  }
}

export default SideBar;
