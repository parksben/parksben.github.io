import React, { Component } from 'react';
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

  render() {
    const postItems = this.props.data.map((p, i) =>
      <article className="post-item" key={`post-${p.date}-${p.title}`}>
        <a className="thumb" href={p.url}>
          <img
            src={p.thumb || defaultThumbs[i % defaultThumbs.length]}
            alt=""
          />
        </a>
        <a href={p.url}>
          <h3 title={p.title}>
            {p.title}
          </h3>
        </a>
        <p>
          {p.date}
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
