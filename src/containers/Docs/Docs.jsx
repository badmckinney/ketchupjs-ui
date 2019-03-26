import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Docs.scss';

class Docs extends Component {

  componentDidMount() {
    this.props.highlight(this.props.location.pathname);
  }

  render() {
    return (
      <div className="docs">
        <h1>KetchupJS</h1>
        <div>Our target is to make it easier for both large and small business owners to record analytical data. We created a library to use in your app to do that. Just use our library where you want to record a piece of data in your code base, and view your analytics at <a href="/">ketchupjs.dev</a>.</div>
        <h2>Quick Start</h2>
        <div>First, signup at <a href="/">ketchupjs.dev</a> you will recieve a secret <span className="bold">Api Key</span> in order to use our service. <span className="bold">DO NOT</span> share this with anyone else.</div>
        <div>After signing up and getting your <span className="bold">Api Key</span> run <span className="code">$ npm install ketchupjs</span>.</div>
        <h2>Using KetchupJS</h2>
        <div className="code">const ketchup = require('ketchupjs')</div>
        <div className="code">ketchup.config("Api_Key")</div>
        <div className="code">ketchup.save( metric, value, [user_name, [public]])</div>
        <div className="code">ketchup.most( metric, value, [user_name, [public]])</div>
        <h2>Parameters</h2>
        <img src="/assets/parameters.png" alt="Parameters Table" />
      </div>
    )
  }
};

export default withRouter(Docs);