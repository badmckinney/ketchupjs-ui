import React, { Component } from 'react';
import Modal from 'react-modal';
import Login from '../Login';
import './LoginButton.scss';

Modal.setAppElement('#root');

class LoginButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
    document.querySelector('.app').classList.add('blur');
  }

  closeModal() {
    document.querySelector('.app').classList.remove('blur');
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <>
        <button className="login" onClick={this.openModal}>Login</button>
        <Modal
          className="login-modal"
          overlayClassName="overlay"
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Login Form"
          shouldCloseOnOverlayClick={true}>
          <Login close={this.closeModal} />
        </Modal>
      </>
    )
  }
}

export default LoginButton;