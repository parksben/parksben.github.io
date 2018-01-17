import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import SideBar from 'components/SideBar';
import CodeBlock from 'components/CodeBlock';
import siteConfig from 'siteConfig';
import { fetchPost } from 'posts';
import 'github-markdown-css';
import './style.css';

export class Article extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  render() {
    const { postName } = this.context.router.route.match.params;
    const { title, time, tag, content } = fetchPost(postName);

    return (
      <div className="page-container markdown-body">
        <SideBar data={siteConfig} />
        <article className="post-container">
          <Link to="/" className="go-home">
            <h2>← 返回主页</h2>
          </Link>
          <div className="inner">
            <h1>
              {title}
            </h1>
            <ReactMarkdown source={`\`${tag.join('` `')}\` - \`${time}\`\n`} />
            <div className="content">
              <ReactMarkdown source={content} renderers={{ CodeBlock }} />
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default Article;
