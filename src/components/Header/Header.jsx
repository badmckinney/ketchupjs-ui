import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import RegisterButton from '../../containers/RegisterButton';
import LoginButton from '../../containers/LoginButton';
import LogoutButton from '../../containers/LogoutButton';

const Header = (props) => {
  return (
    <div className="header">
      <div className="left">
        <img src="/assets/KetchupJS.png" alt="ketchupjs logo" />
        <nav className="nav">
          <Link to="/"><button id="/" className="nav-link">Home</button></Link>
          <Link to="/docs"><button id="/docs" className="nav-link">Documentation</button></Link>
          <Link to="/feed"><button id="/feed" className="nav-link">Feed</button></Link>
          {props.currentUser ? <Link to="/profile"><button id="/profile" className="nav-link">Profile</button></Link> : <></>}
        </nav>
      </div>

      <div className="btn-wrapper">
        {props.currentUser ?
          <LogoutButton />
          :
          <>
            <LoginButton />
            <RegisterButton />
          </>
        }
      </div>
    </div>
  )
};

export default Header;

