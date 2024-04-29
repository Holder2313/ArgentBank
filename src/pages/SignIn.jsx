import React, { useEffect, useState } from "react";
import userIcon from "../assets/icons/user-circle.svg";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router";
import { loginUser } from "../features/loginUser";
import {getUser} from "../features/getUser";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);

  const { loading, token, user } = useSelector((state) => state.login);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let userLogin = {
      email: email,
      password: password,
    };

    dispatch(loginUser(userLogin)).then((result) => {
      if (result.payload.status === 200) {
        setEmail("");
        setPassword("");
        navigate("/user");

        if (rememberMe) {
          localStorage.setItem("user", "connected");
        }
      } else {
        setErrorMsg(
          result && result.payload ? result.payload.error : "Unknown error"
        );
      }
    });
  };

  useEffect(() => {
    if (token) {
      console.log(token);
      alert("test");
      const tokenUser = token;
      dispatch(getUser(tokenUser));
    }
  }, [token, dispatch, user]);

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
            <label htmlFor="remem ber-me">Remember me</label>
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
