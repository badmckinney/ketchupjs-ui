import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.scss';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
// import Home from '../../components/Home';
// import Profile from '../../containers/Profile';
import Feed from '../../containers/Feed';
// import Client from '../../containers/Client';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="app">
        <Router>
          <>
            <Header currentUser={this.props.currentUser} />
            <Switch>
              {/* <Route exact={true} path='/' component={Home} /> */}
              {/* <Route exact={true} path='/profile' component={Profile} /> */}
              <Route exact={true} path='/feed' component={Feed} />
              {/* <Route exact={true} path='/:client' component={Client} /> */}
            </Switch>
            <Footer />
          </>
        </Router>
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