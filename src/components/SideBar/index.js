import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { randomId } from 'utils';
import './style.css';

export class SideBar extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

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
      social,
      copyright,
    } = this.props.data;

    return (
      <header id="header">
        <div
          className="blog-avatar"
          style={{ backgroundImage: `url(${avatar})` }}
        />
        <div className="inner">
          <Link to="/" className="blog-title">
            {title}
          </Link>
          <div className="blog-subtitle">
            {subTitle}
          </div>
          <div className="blog-desc">
            {intro}
          </div>
        </div>
        <div className="block-blank" />
        <footer id="footer">
          <div className="inner">
            {this.renderSocialLink(social)}
            <div className="copyright">
              {copyright}
            </div>
          </div>
        </footer>
      </header>
    );
  }
}

export default SideBar;
