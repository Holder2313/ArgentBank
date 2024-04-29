import React from 'react'
import userIcon from '../assets/icons/user-circle.svg'
import logOut from '../assets/icons/sign-out.svg'
import logo from '../img/argentBankLogo.png'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/loginUser';



export default function Header() {

  const Auth = useSelector((state) => state.login.isAuth); 
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  console.log(Auth);

 
  // if (!user || !user.firstName) {
  //   return null;
  // }
  
  const authStorage = localStorage.getItem('user');
  const isAuth = Auth || authStorage;

  
  function handleLogOut() {
    dispatch(logoutUser());
    localStorage.removeItem('user');
    navigate('/signIn');

  }
  

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

      <div className=" main-nav">
        {isAuth && (
          <Link className="main-nav-item" to="/user">
            <img
              className="main-nav-icon"
              src={userIcon}
              alt="user-circle-icon"
            />
            <p>{isAuth && user && user.body.firstName}</p> 
          </Link>
        )}

        <Link
          className="main-nav-item"
          to={!isAuth ? "/signIn" : "/"}
          onClick={handleLogOut}
        >
          <img
            className="main-nav-icon"
            src={!isAuth ? userIcon : logOut}
            alt="user-circle-icon"
          />
          {isAuth ? "Sign Out" : "Sign In"}
        </Link>
      </div>
    </nav>
  );
}
