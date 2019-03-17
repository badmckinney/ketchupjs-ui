import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions';

import './LogoutButton.scss';

class LogoutButton extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logout();
  }

  render() {
    return (
      <>
        <button className="logout" onClick={this.logout}>Logout</button>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

LogoutButton = connect(
  null,
  mapDispatchToProps
)(LogoutButton);

export default LogoutButton;