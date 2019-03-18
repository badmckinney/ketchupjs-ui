import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Profile.scss';

import { loadProfile, generateAPIKey } from '../../actions';
import EditProfileButton from '../EditProfileButton';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.onGenerate = this.onGenerate.bind(this);
  }

  componentDidMount() {
    this.props.loadProfile();
  }

  onGenerate() {
    this.props.generateAPIKey();
  }

  render() {
    return (
      <div className="profile">
        <div className="top">
          <div className="info">
            <div className="name">{this.props.profile.name}</div>
            <div className="username">{this.props.profile.username}</div>
            <div className="privacy">Data Privacy: {this.props.profile.public ? "Public" : "Private"}</div>
          </div>
          <EditProfileButton />
        </div>
        <div className="api">
          API Key: {this.props.profile.key ? <div className="api-key">{this.props.profile.key}</div> : <button onClick={this.onGenerate}>Generate API Key</button>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    generateAPIKey: () => dispatch(generateAPIKey()),
    loadProfile: () => dispatch(loadProfile())
  };
}

Profile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

export default Profile;