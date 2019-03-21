import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Register.scss';
import { register, checkUniqueUsername, checkUniqueName } from '../../actions/index';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      username: '',
      password: '',
      errorMessage: '',
      isValid: false,
      isUnique: false
    };

    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkUnique = this.checkUnique.bind(this);
  }

  checkUnique() {
    if (this.state.name.length > 5 && this.state.username.length > 5) {
      const uniqueUsername = this.props.checkUniqueUsername(this.state.username);
      const uniqueName = this.props.checkUniqueName(this.state.name);

      Promise.all([uniqueUsername, uniqueName]).then(values => {
        if (values[0] === true && values[1] === true) {
          this.setState({ isUnique: true, errorMessage: '' });
        }
      });
    }
  }

  handleInputOnChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });

    this.checkUnique();

    if (this.state.password.length > 5 && this.state.username.length > 5) {
      this.setState({ isValid: true, errorMessage: '' });
    } else {
      this.setState({ isValid: false });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.name || !this.state.username || !this.state.password) {
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

    const newClient = this.state;
    this.props.register(newClient);
    this.props.close();
  }

  render() {
    return (
      <div className="register">
        <form className="register_form">
          <h1> </h1>
          <input
            type="text"
            name="name"
            placeholder="Company name"
            value={this.state.name}
            onChange={this.handleInputOnChange}
            required />
          <input
            type="text"
            name="username"
            className="nested-input"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleInputOnChange}
            required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputOnChange}
            required />

          <div className="btn-container">
            <button className="btn" onClick={this.handleSubmit}>Register</button>
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
    register: newClient => dispatch(register(newClient)),
    checkUniqueUsername: username => dispatch(checkUniqueUsername(username)),
    checkUniqueName: name => dispatch(checkUniqueName(name))
  }
}

Register = connect(
  null,
  mapDispatchToProps
)(Register);

export default Register;