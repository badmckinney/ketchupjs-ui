import React, { Component } from 'react';
//import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.scss';

import Header from '../../components/Header';
import Profile from '../../containers/Profile';
import Footer from '../../components/Footer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="app">
        <Header currentUser={this.props.currentUser} />
        <Profile />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {};
}

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default App;