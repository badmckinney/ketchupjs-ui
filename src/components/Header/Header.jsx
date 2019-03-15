import React from 'react';
import './Header.scss'
import RegisterButton from '../../containers/RegisterButton';

const Header = (props) => {
  return (
    <div className="header">
      <img src="" alt="ketchupjs logo" />
      <div className="logotype">ketchupjs</div>
      <RegisterButton />
    </div>
  )
};

export default Header;

