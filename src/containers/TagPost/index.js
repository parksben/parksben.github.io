import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SideBar from 'components/SideBar';
import PostList from 'components/PostList';
import Header from 'components/Header';
import * as TagPostActions from './actions';
import { Button } from 'antd';
import siteConfig from 'siteConfig';
import './style.css';

const mapStateToProps = ({ tagPost }) => ({ tagPost });

const mapDispatchToProps = dispatch => ({
  tagPostActions: bindActionCreators(TagPostActions, dispatch),
});

export class TagPost extends Component {
  static propTypes = {
    tagPost: PropTypes.object.isRequired,
    tagPostActions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.perPage = 6;
  }

  componentDidMount() {
    this.props.tagPostActions.fetchPostInfo();

    const { tagName } = this.props.match.params;
    this.props.tagPostActions.setTagName(tagName);
    this._loadPage(1);
  }

  componentDidUpdate(prevProps) {
    let oldTag = prevProps.match.params.tagName;
    let newTag = this.props.match.params.tagName;

    if (newTag !== oldTag) {
      this.props.tagPostActions.setTagName(newTag);
      this._loadPage(1);
    }
  }

  _loadPage(pageNum) {
    const { tagName } = this.props.match.params;
    this.props.tagPostActions.fetchTagPostList(tagName, this.perPage, pageNum);

    this.pageNum = pageNum;
  }

  render() {
    const { tagName } = this.props.match.params;

    const {
      postInfo: { postCount, tagInfo },
      postList,
      loadMore,
    } = this.props.tagPost.toJS();

    const navList = [
      {
        linkTo: '/',
        tag: `全部文章（${postCount}）`,
      },
      ...tagInfo,
    ];

    const loadMoreBtn = loadMore
      ? <Button
          size="large"
          className="load-more"
          onClick={() => this._loadPage(this.pageNum + 1)}>
          加载更多文章
        </Button>
      : false;

    return (
      <div className="page-container">
        <SideBar data={siteConfig} />
        <div className="post-list">
          <Header data={navList} activeTag={tagName} />
          <PostList goHome data={postList} />
          {loadMoreBtn}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagPost);
