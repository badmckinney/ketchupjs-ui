import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.scss';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Hero from '../../containers/Hero';
import Profile from '../../containers/Profile';
import Feed from '../../containers/Feed';
import Docs from '../../containers/Docs';
import Examples from '../../containers/Examples';
import Client from '../../containers/Client';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  highlight(location) {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      if (link.id === location) {
        link.classList.add('current');
      } else {
        link.classList.remove('current');
      }
    })
  }

  render() {
    return (
      <div className="app">
        <Router>
          <>
            <Header currentUser={this.props.currentUser} />
            <Switch>
              <Route
                exact={true}
                path='/'
                render={() => (
                  <Hero highlight={this.highlight} />
                )} />
              <Route
                exact={true}
                path='/profile'
                render={() => (
                  <Profile highlight={this.highlight} />
                )}
              />
              <Route
                exact={true}
                path='/feed'
                render={() => (
                  <Feed highlight={this.highlight} />
                )}
              />
              <Route
                exact={true}
                path='/docs'
                render={() => (
                  <Docs highlight={this.highlight} />
                )}
              />
              <Route
                exact={true}
                path='/examples'
                render={() => (
                  <Examples highlight={this.highlight} />
                )}
              />
              <Route
                exact={true}
                path='/:client'
                render={() => (
                  <Client highlight={this.highlight} />
                )}
              />
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