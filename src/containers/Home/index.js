import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as HomeActions from './actions';
import logo from './images/logo.svg';
import './style.css';

const mapStateToProps = ({ demo }) => ({
  demo,
});

const mapDispatchToProps = dispatch => ({
  homeActions: bindActionCreators(HomeActions, dispatch),
});

export class Home extends Component {
  static propTypes = {
    demo: PropTypes.object.isRequired,
    homeActions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.homeActions.fetchHome();
  }

  render() {
    const { hello: { title, intro, text } } = this.props.demo.toJS();

    return (
      <div className="Home">
        <header className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h1 className="Home-title">
            {title}
          </h1>
        </header>
        <p className="Home-intro">
          {intro}
          <br />
          {text}
        </p>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
