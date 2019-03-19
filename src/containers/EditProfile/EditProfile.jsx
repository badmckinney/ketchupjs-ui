import React, { Component } from 'react';
import { connect } from 'react-redux';
import './EditProfile.scss';
import { editProfile } from '../../actions';

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      username: '',
      public: ''
    };

    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState(this.props.profile);
  }

  handleInputOnChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "public") {
      if (value === "true") {
        this.setState({ public: true });
      } else {
        this.setState({ public: false });
      }
    } else {
      this.setState({ [name]: value });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const updatedInfo = this.state;
    this.props.editProfile(updatedInfo);
    this.props.close();
  }

  render() {
    return (
      <div className="edit-profile">
        <form className="edit-profile_form">
          <h1> </h1>
          <input
            type="text"
            name="name"
            placeholder="Company name"
            value={this.state.name}
            onChange={this.handleInputOnChange}
            required
            pattern="[A-Za-z]{1,30}" />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleInputOnChange}
            onKeyUp={this.checkUniqueUsername}
            required
            pattern="[A-Za-z0-9_]{6,30}" />

          <div className="privacy">
            <label htmlFor="public">Data privacy:</label>
            <select name="public" onChange={this.handleInputOnChange} value={this.state.public}>
              <option value="true">Public</option>
              <option value="false">Private</option>
            </select>
          </div>

          <div className="btn-container">
            <button className="btn" onClick={this.handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editProfile: updatedInfo => dispatch(editProfile(updatedInfo))
  }
}

EditProfile = connect(
  null,
  mapDispatchToProps
)(EditProfile);

export default EditProfile;