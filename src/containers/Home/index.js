import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SideBar } from 'components/SideBar';
import { PostList } from 'components/PostList';
import * as HomeActions from './actions';
import './style.css';

const mapStateToProps = ({ home }) => ({
  home,
});

const mapDispatchToProps = dispatch => ({
  homeActions: bindActionCreators(HomeActions, dispatch),
});

export class Home extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    homeActions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.homeActions.fetchHome();
    this.props.homeActions.fetchPostList();
  }

  render() {
    const { home, postList } = this.props.home.toJS();

    return (
      <div className="page-container">
        <SideBar data={home} />
        <div className="post-list">
          <PostList data={postList} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
