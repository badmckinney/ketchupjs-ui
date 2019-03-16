import React, { Component } from 'react';
//import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.scss';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
}

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default App;