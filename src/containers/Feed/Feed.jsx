import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Feed.scss';
import FeedList from '../../containers/FeedList'
// import Featured from '../../components/Featured'
// import { login } from '../../actions/index';

class Feed extends Component {

  render() {
    return (
      <div className="feed">
        <FeedList />
        {/* <Featured/> */}
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