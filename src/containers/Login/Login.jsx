import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Login.scss';
import { login } from '../../actions/index';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      errorMessage: ''
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
    this.props.login(client).then(res => {
      if (res) {
        this.props.close();
      } else {
        this.setState({ errorMessage: 'Incorrect username or password' });
      }
    })
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
            required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputOnChange}
            required />

          <div className="btn-container">
            <button className="btn" onClick={this.handleSubmit}>
              Login
            </button>
          </div>
          <div className="register-here">
            {this.state.errorMessage}
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