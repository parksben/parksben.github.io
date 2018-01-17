import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import defaultThumbs from './images';
import './style.css';

export class PostList extends Component {
  static propTypes = {
    data: PropTypes.array,
  };

  static defaultProps = {
    data: [
      {
        title: '示例文章',
        date: new Date()
          .toLocaleString('chinese', { hour12: false })
          .replace(/\//gi, '-'),
        url: '/',
      },
    ],
  };

  _loadThumb = (thumb, i) => {
    if (!thumb.length) {
      return defaultThumbs[i % defaultThumbs.length];
    }
    if (/http(s)?/gi.test(thumb)) {
      return thumb;
    }

    const image = require(`../../${thumb}`);
    return image;
  };

  render() {
    const postItems = this.props.data.map((p, i) =>
      <article className="post-item" key={`post-${p.date}-${p.title}`}>
        <Link className="thumb" to={p.url}>
          <img src={this._loadThumb(p.thumb, i)} alt="" />
        </Link>
        <Link to={p.url}>
          <h3 title={p.title}>
            {p.title}
          </h3>
        </Link>
        <p>
          {p.time}
        </p>
      </article>
    );

    return (
      <section id="posts">
        <h2>最新文章</h2>
        <div className="row">
          {postItems}
        </div>
      </section>
    );
  }
}

export default PostList;
