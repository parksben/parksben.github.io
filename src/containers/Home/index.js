import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SideBar from 'components/SideBar';
import PostList from 'components/PostList';
import Header from 'components/Header';
import * as HomeActions from './actions';
import { Button } from 'antd';
import siteConfig from 'siteConfig';
import './style.css';

const mapStateToProps = ({ home }) => ({ home });

const mapDispatchToProps = dispatch => ({
  homeActions: bindActionCreators(HomeActions, dispatch),
});

export class Home extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    homeActions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.perPage = 6;
  }

  componentDidMount() {
    this.props.homeActions.fetchPostInfo();
    this.props.homeActions.resetPostList();
    this._loadPage(1);
  }

  _loadPage(pageNum) {
    this.props.homeActions.fetchPostList(this.perPage, pageNum);
    this.pageNum = pageNum;
  }

  render() {
    const {
      postInfo: { postCount, tagInfo },
      postList,
      loadMore,
    } = this.props.home.toJS();

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
          <Header data={navList} activeTag={`全部文章（${postCount}）`} />
          <PostList data={postList} />
          {loadMoreBtn}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
