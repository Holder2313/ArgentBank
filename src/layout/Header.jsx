import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Actions Redux pour les opérations de login et de récupération des données utilisateur
import { logoutUser } from "../features/loginUser";
import { getUser } from "../features/getUser";
// import des icones
import userIcon from "../assets/icons/user-circle.svg";
import logOut from "../assets/icons/sign-out.svg";
import logo from "../img/argentBankLogo.avif";

export default function Header() {
  // Récupération des données depuis le store Redux
  const { isAuth, token } = useSelector((state) => state.login);
  const user = useSelector((state) => state.user.user);

  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // recuperation des données si actualisation
  useEffect(() => {
    if (token) {
      dispatch(getUser(token));
    }
  }, [token, dispatch]);


  // Fonction de déconnexion
  function handleLogOut() {
    dispatch(logoutUser());
    localStorage.removeItem("token");
    navigate("/");
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
        {/* Affichage des éléments de navigation en fonction de l'état de connexion */}
        {isAuth && (
          <Link className="main-nav-item" to="/user">
            <img
              className="main-nav-icon"
              src={userIcon}
              alt="user-circle-icon"
            />
            <p>{isAuth && user && user.body.userName}</p>
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

          {/* Affichage du texte en fonction de l'état de connexion */}
          {isAuth ? "Sign Out" : "Sign In"}
        </Link>
      </div>
    </nav>
  );
}
