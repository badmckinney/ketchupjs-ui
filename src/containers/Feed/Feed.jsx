import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Feed.scss';
import FeedList from '../../containers/FeedList'
import Feature from '../../containers/Feature'
// import { login } from '../../actions/index';

class Feed extends Component {

  componentDidMount() {
    this.props.highlight(this.props.location.pathname);
  }

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

export default withRouter(Feed);