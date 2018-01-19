import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { randomId } from 'utils';
import './style.css';

export class SideBar extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  renderTag(tag) {
    const items = tag.map(o =>
      <Link
        to={`/tag/${o.tag}`}
        className="tag"
        key={`tag_${randomId()}`}>
        {o.tag} ({o.count})
      </Link>
    );

    return items;
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
          <Link to="/">
            <h1>
              {title}
            </h1>
          </Link>
          <h2>
            {subTitle}
          </h2>
          <p>
            {intro}
          </p>
          <h3 className="tag-hot">TAGS TOP5:</h3>
          {this.renderTag(tag.slice(0, 5))}
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
