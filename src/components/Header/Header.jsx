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
        <Link to="/"><img src="/assets/KetchupJS.png" alt="ketchupjs logo" /></Link>
        <nav className="nav">
          <Link to="/"><button id="/" className="nav-link">Home</button></Link>
          {props.currentUser ? <Link to="/profile"><button id="/profile" className="nav-link">My Profile</button></Link> : <></>}
          <Link to="/docs"><button id="/docs" className="nav-link">Documentation</button></Link>
          <Link to="/examples"><button id="/examples" className="nav-link">Examples</button></Link>
          <Link to="/feed"><button id="/feed" className="nav-link">Feed</button></Link>
        </nav>
      </div>

      <div className="btn-wrapper">
        {props.currentUser ?
          <>
            <button className="dashboard">Dashboard</button>
            <LogoutButton />
          </>
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

