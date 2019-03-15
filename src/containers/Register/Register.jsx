import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Register.scss';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      username: '',
      password: ''
    };

    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputOnChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const newClient = this.state;
    this.props.register(newClient);
  }

  render() {
    return (
      <div className="register">
        <form className="register_form">
          <h1>Sign Up</h1>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleInputOnChange}
            required
            pattern="[A-Za-z]{1,30}" />
          <input
            type="text"
            name="username"
            className="nested-input"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleInputOnChange}
            onKeyUp={this.checkUniqueUsername}
            required
            pattern="[A-Za-z0-9_]{6,30}" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputOnChange}
            required
            minLength="6"
            maxLength="30" />

          <div className="btn-container">
            <button className="btn" onClick={this.handleSubmit}>
              Register
            </button>
          </div>
          <div className="login-here">
            Already have an account? Login here
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    register: user => dispatch(register(user))
  }
}

Register = connect(
  null,
  mapDispatchToProps
)(Register);

export default Register;