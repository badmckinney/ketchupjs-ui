import React, { Component } from 'react';
import { connect } from 'react-redux';
import './EditProfile.scss';
import { editProfile, checkUniqueName, checkUniqueUsername, loadProfile } from '../../actions';

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      username: '',
      public: '',
      isValid: false,
      isUnique: false
    };

    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkUnique = this.checkUnique.bind(this);
  }

  componentDidMount() {
    this.setState(this.props.profile);
  }

  checkUnique() {
    if (this.state.name.length > 1 && this.state.username.length > 5) {
      const uniqueUsername = this.props.checkUniqueUsername(this.state.username);
      const uniqueName = this.props.checkUniqueName(this.state.name);

      Promise.all([uniqueUsername, uniqueName]).then(values => {
        if (values[0] === true && values[1] === true) {
          this.setState({ isUnique: true, errorMessage: '' });
        } else {
          this.setState({ isUnique: false });
        }
      });
    } else {
      this.setState({ isUnique: false });
    }
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
      this.setState({ [name]: value }, () => {
        this.checkUnique();

        if (this.state.username.length > 5) {
          this.setState({ isValid: true, errorMessage: '' });
        } else {
          this.setState({ isValid: false });
        }
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.name || !this.state.username) {
      this.setState({ errorMessage: 'Please fill out all fields' });
      return false;
    }

    if (!this.state.isValid) {
      this.setState({ errorMessage: 'Username and password must have a length of 6' });
      return false;
    }

    if (!this.state.isUnique) {
      this.setState({ errorMessage: 'Username or Company name taken' });
      return false
    }

    const updatedInfo = this.state;
    this.props.editProfile(updatedInfo).then(() => this.props.loadProfile());
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
          <div className="error">
            {this.state.errorMessage}
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editProfile: updatedInfo => dispatch(editProfile(updatedInfo)),
    loadProfile: () => dispatch(loadProfile()),
    checkUniqueUsername: username => dispatch(checkUniqueUsername(username)),
    checkUniqueName: name => dispatch(checkUniqueName(name))
  }
}

EditProfile = connect(
  null,
  mapDispatchToProps
)(EditProfile);

export default EditProfile;