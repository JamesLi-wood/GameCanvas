import "../stylesheet/login.css";
import {
  where,
  query,
  getDocs,
} from "../database/node_modules/firebase/firestore";
import { userRef } from "../database/src/db";
import { setUser } from "./App";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  /* When the user enters the login info, it'll do 3 things:
     1) Goes into the User collection in firebase and query
        based on the entered username and password
     2) If the user does not exist in the User collection,
        an error message will appear 
     3) If the user does exist in the User collection, the
        user's info will be set in a storage session and
        navigates the user to the homepage. */
  const handleSubmit = (e) => {
    e.preventDefault();
    const q = query(
      userRef,
      where("username", "==", username),
      where("password", "==", password)
    );

    getDocs(q).then((snapshot) => {
      if (snapshot.empty) {
        const highlight = document.getElementsByClassName("input");
        for (let i = 0; i < highlight.length; i++) {
          highlight[i].style["borderColor"] = "red";
        }
        setError(true);
      } else {
        setUser(true, username, snapshot.docs[0].id);
        navigate("/home");
      }
    });
  };

  // shows the password entered.
  function showPassword() {
    const input = document.getElementById("password");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  }

  return (
    <div className="login-body">
      <div className="login-card">
        <Link to="/home">
          <button className="logo">GameCanvas</button>
        </Link>
        <div className="name">Login</div>
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            id="password"
            className="input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="password-checkbox">
            <input onClick={showPassword} type="checkbox"></input>
            <div>Show password</div>
          </div>
          {error && (
            <div className="error">
              Credentials do not match. <br></br>
              Please try again.
            </div>
          )}
          <button className="login-button" type="submit">
            LOGIN
          </button>
        </form>
        <div className="signUp">
          Don't have an account?
          <Link to="/signUp">
            <div>Sign Up!</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
