import React, { Component } from 'react';
import Modal from 'react-modal';
import EditProfile from '../EditProfile';
import './EditProfileButton.scss';

Modal.setAppElement('#root');

class EditProfileButton extends Component {
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
        <button className="edit-profile" onClick={this.openModal}>Edit</button>
        <Modal
          className="edit-profile-modal"
          overlayClassName="overlay"
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Edit Profile Form"
          shouldCloseOnOverlayClick={true}>
          <EditProfile close={this.closeModal} profile={this.props.profile} />
        </Modal>
      </>
    )
  }
}

export default EditProfileButton;