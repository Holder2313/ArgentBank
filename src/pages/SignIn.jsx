import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import userIcon from "../assets/icons/user-circle.svg";

// Actions Redux pour les opérations de login et de récupération des données utilisateur
import { loginUser } from "../features/loginUser";
import { getUser } from "../features/getUser";

export default function SignIn() {
  // État local pour les formulaires de connexion, msg d'erreur, checkbox rememberMe
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Etat du login depuis le store Redux
  const { loading, token } = useSelector((state) => state.login);

  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fonction de connexion qui envoie les données au serveur
  const loginFunction = (userLogin, rememberMe) => {
    dispatch(loginUser({ userLogin, rememberMe })).then((result) => {
      if (result.payload.status === 200 || localStorage.getItem("token")) {
        setEmail("");
        setPassword("");
        navigate("/user");
      } else {
        setErrorMsg(
          result && result.payload ? result.payload.error : "Unknown error"
        );
      }
    });
  };

  // Gestion de la case à cocher Remember Me
  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  // gestion de la soumission du formulaire
  const handleLogin = (e) => { 
    e.preventDefault();
    let userLogin = {
      email: email,
      password: password,
    };
    loginFunction(userLogin, rememberMe);
  };

  // Récupération des données utilisateur après le login
  useEffect(() => {
    if (token) {
      dispatch(getUser(token));
    }
  }, [dispatch, token]);


  
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <img className="main-nav-icon" src={userIcon} alt="user-circle-icon" />
        <h1>Sign In</h1>

        <form onSubmit={handleLogin}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="username"
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              required
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={handleRememberMe}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button className="sign-in-button">
            {loading ? "Loading..." : "Sign In"}
          </button>

          {errorMsg && <div className="error-message">{errorMsg}</div>}
        </form>
      </section>
    </main>
  );
}
