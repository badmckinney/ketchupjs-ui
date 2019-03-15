import React, { Component } from 'react';
import Modal from 'react-modal';
import Register from '../Register';
import './RegisterButton.scss';

Modal.setAppElement('#root');

class RegisterButton extends Component {
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
    this.setState({ modalIsOpen: false });
    document.querySelector('.app').classList.remove('blur');
  }

  render() {
    return (
      <>
        <button className="register" onClick={this.openModal}>Register</button>
        <Modal
          className="modal"
          overlayClassName="overlay"
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Register Form"
          shouldCloseOnOverlayClick={true}>
          <Register close={this.closeModal} />
        </Modal>
      </>
    )
  }
}

export default RegisterButton;