import React from 'react';
import './Header.scss'
import RegisterButton from '../../containers/RegisterButton';
import LoginButton from '../../containers/LoginButton';

const Header = (props) => {
  return (
    <div className="header">
      <img src="" alt="ketchupjs logo" />
      <div className="logotype">ketchupjs</div>
      <LoginButton />
      <RegisterButton />
    </div>
  )
};

export default Header;

