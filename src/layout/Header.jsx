import React from 'react'
import userIcon from '../assets/icons/user-circle.svg'
import logo from '../img/argentBankLogo.png'
import { Link } from 'react-router-dom';


export default function Header() {
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      <div>
        <Link className="main-nav-item" to="/signIn">
          <img
            className="main-nav-icon"
            src={userIcon}
            alt="user-circle-icon"
          />
          Sign In
        </Link>
      </div>
    </nav>
  );
}
