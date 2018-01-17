import React, { Component } from 'react';
import SideBar from 'components/SideBar';
import PostList from 'components/PostList';
import siteConfig from 'siteConfig';
import posts from 'posts';
import './style.css';

export class Home extends Component {
  render() {
    return (
      <div className="page-container">
        <SideBar data={siteConfig} />
        <div className="post-list">
          <PostList data={posts} />
        </div>
      </div>
    );
  }
}

export default Home;
