import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Profile.scss';

import { loadProfile, generateAPIKey } from '../../actions';
import EditProfileButton from '../EditProfileButton';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.onGenerate = this.onGenerate.bind(this);
  }

  componentDidMount() {
    this.props.highlight(this.props.location.pathname);
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
            <div className="name"><span className="label">Company Name:</span> {this.props.profile.name}</div>
            <div className="username"><span className="label">Username:</span> {this.props.profile.username}</div>
            {}<div className="privacy"><span className="label">Data Privacy:</span> {this.props.profile.public ? <span className='public'>Public</span> : <span className='private'>Private</span>}</div>
          </div>
          <EditProfileButton profile={{ name: this.props.profile.name, username: this.props.profile.username, public: this.props.profile.public }} />
        </div>
        <div className="api">
          <span className="label">API Key:</span> {this.props.profile.key ? <div className="api-key">{this.props.profile.key}</div> : <button onClick={this.onGenerate}>Generate API Key</button>}
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

export default withRouter(Profile);