import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import SideBar from 'components/SideBar';
import GoBack from 'components/GoBack';
import CodeBlock from 'components/CodeBlock';
import Header from 'components/Header';
import * as ArticleActions from './actions';
import siteConfig from 'siteConfig';
import './style.css';

const mapStateToProps = ({ article }) => ({ article });

const mapDispatchToProps = dispatch => ({
  articleActions: bindActionCreators(ArticleActions, dispatch),
});

export class Article extends Component {
  static propTypes = {
    article: PropTypes.object.isRequired,
    articleActions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { postName } = this.props.match.params;
    this.props.articleActions.fetchPostContent(postName);
  }

  componentDidUpdate(prevProps) {
    const oldPostName = prevProps.match.params.postName;
    const { postName } = this.props.match.params;

    if (oldPostName !== postName) {
      this.props.articleActions.resetPostContent();
      this.props.articleActions.fetchPostContent(postName);
    }
  }

  render() {
    const navList = [
      {
        linkTo: '/',
        tag: `全部文章（${siteConfig.postCount}）`,
      },
      ...siteConfig.tag,
    ];

    const {
      postContent: { title, time, tag, content },
    } = this.props.article.toJS();

    if (!title) {
      return false;
    }

    return (
      <div className="page-container markdown-body">
        <SideBar data={siteConfig} />
        <Header data={navList} />
        <article className="post-container">
          <GoBack />
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

export default connect(mapStateToProps, mapDispatchToProps)(Article);
