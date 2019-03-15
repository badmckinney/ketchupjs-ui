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

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ modalIsOpen: !this.modalIsOpen });
  }

  render() {
    return (
      <>
        <button className="register" onClick={this.toggleModal}>Create an account</button>
        <Modal
          className="modal"
          overlayClassName="overlay"
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.toggleModal}
          contentLabel="Register Form"
          shouldCloseOnOverlayClick={true}>
          <Register close={this.toggleModal} />
        </Modal>
      </>
    )
  }
}

export default RegisterButton;