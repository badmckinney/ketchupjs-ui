import React from 'react';
import './Header.scss'
import RegisterButton from '../../containers/RegisterButton';
import LoginButton from '../../containers/LoginButton';
import LogoutButton from '../../containers/LogoutButton';

const Header = (props) => {
  if (props.currentUser) {

    return (
      <div className="header">
        <img src="/assets/KetchupJS.png" alt="ketchupjs logo" />
        <div className="btn-wrapper">
          <LogoutButton />
        </div>
      </div>
    )
  }
  return (
    <div className="header">
      <img src="/assets/KetchupJS.png" alt="ketchupjs logo" />
      <div className="btn-wrapper">
        <LoginButton />
        <RegisterButton />
      </div>
    </div>
  )
};

export default Header;

