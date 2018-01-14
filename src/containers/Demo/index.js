import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as DemoActions from './actions';
import logo from './images/logo.svg';
import './style.css';

const mapStateToProps = ({ demo }) => ({
  demo,
});

const mapDispatchToProps = dispatch => ({
  demoActions: bindActionCreators(DemoActions, dispatch),
});

export class Demo extends Component {
  static propTypes = {
    demo: PropTypes.object.isRequired,
    demoActions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.demoActions.fetchDemo();
  }

  render() {
    const { hello: { title, intro, text } } = this.props.demo.toJS();

    return (
      <div className="Demo">
        <header className="Demo-header">
          <img src={logo} className="Demo-logo" alt="logo" />
          <h1 className="Demo-title">
            {title}
          </h1>
        </header>
        <p className="Demo-intro">
          {intro}
          <br />
          {text}
        </p>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Demo);
