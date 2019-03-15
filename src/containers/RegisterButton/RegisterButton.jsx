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

  openModal(e) {
    e.preventDefault();
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <>
        <button className="register" onClick={this.openModal}>Create an account</button>
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