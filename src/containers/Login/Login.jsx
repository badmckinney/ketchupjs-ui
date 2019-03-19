import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Login.scss';
import { login } from '../../actions/index';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    const client = this.state;
    this.props.login(client);
    this.props.close();
  }

  render() {
    return (
      <div className="login">
        <form className="login_form">
          <h1> </h1>
          <input
            type="text"
            name="username"
            className="nested-input"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleInputOnChange}
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
              Login
            </button>
          </div>
          <div className="register-here">
            Don't have an account? Sign up
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: client => dispatch(login(client))
  }
}

Login = connect(
  null,
  mapDispatchToProps
)(Login);

export default Login;