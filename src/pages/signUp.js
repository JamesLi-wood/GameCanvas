import "../stylesheet/login.css";
import { Link, useNavigate } from "react-router-dom";
import { userRef } from "../database/src/db";
import { useState } from "react";
import { user } from "./login";
import {
  where,
  query,
  getDocs,
  addDoc,
} from "../database/node_modules/firebase/firestore";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = query(userRef, where("username", "==", username));

    getDocs(q).then((snapshot) => {
      if (snapshot.docs.length === 1) {
        const highlight = document.getElementsByClassName("input");
        for (let i = 0; i < highlight.length; i++) {
          highlight[i].style["borderColor"] = "red";
        }
        setError(true);
      } else {
        addDoc(userRef, {
          username: username,
          password: password,
        });
        user.loggedIn = true;
        user.username = username;
        user.data = q;
        navigate("/");
      }
    });
  };

  return (
    <div className="login-body">
      <div className="login-card">
        <Link to="/">
          <button className="logo">GameCanvas</button>
        </Link>
        <form onSubmit={handleSubmit}>
          <div className="name">Enter your Username:</div>
          <input
            className="input"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <div className="name">Enter your Password:</div>
          <input
            className="input"
            type="text"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <div className="error">
              Username already exists. <br></br>
              Please choose another username.
            </div>
          )}
          <button className="login-button">Sign Up</button>
          <div className="signUp">
            Already have an account?
            <Link to="/Login">Log In!</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
