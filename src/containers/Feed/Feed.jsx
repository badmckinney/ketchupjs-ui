import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Feed.scss';
import FeedList from '../../containers/FeedList'
import Feature from '../../containers/Feature'
// import { login } from '../../actions/index';

class Feed extends Component {

  render() {
    return (
      <div className="feed">
        <FeedList />
        <Feature />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // login: client => dispatch(login(client))
  }
}

Feed = connect(
  null,
  mapDispatchToProps
)(Feed);

export default Feed;