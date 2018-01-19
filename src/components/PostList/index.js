import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { randomId } from 'utils';
import defaultThumbs from './images';
import './style.css';

export class PostList extends Component {
  static propTypes = {
    title: PropTypes.string,
    data: PropTypes.array,
    goHome: PropTypes.bool,
  };

  static defaultProps = {
    title: '文章列表',
    data: [
      {
        title: '示例文章',
        date: new Date()
          .toLocaleString('chinese', { hour12: false })
          .replace(/\//gi, '-'),
        url: '/',
      },
    ],
    goHome: false,
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
      <article className="post-item" key={`post-${p.time}-${p.title}`}>
        <Link className="thumb" to={p.url}>
          <img src={this._loadThumb(p.thumb, i)} alt="" />
        </Link>
        <div className="tag-bar">
          {p.tag.map(t =>
            <Link to={`/tag/${t}`} key={`post_tag_${randomId()}`}>
              <p>
                {t}
              </p>
            </Link>
          )}
        </div>
        <Link to={p.url}>
          <h3 title={p.title}>
            {p.title}
          </h3>
        </Link>
        <p className="time">
          {p.time}
        </p>
      </article>
    );

    const goHome = this.props.goHome
      ? <Link to="/" className="go-home">
          <h2>← 返回主页</h2>
        </Link>
      : false;

    return (
      <section id="posts">
        {goHome}
        <h2>
          {this.props.title}
        </h2>
        <div className="row">
          {postItems}
        </div>
      </section>
    );
  }
}

export default PostList;
