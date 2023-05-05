import "../stylesheet/login.css";
import {
  where,
  query,
  getDocs,
  addDoc,
} from "../database/node_modules/firebase/firestore";
import { userRef } from "../database/src/db";
import { setUser } from "./App";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = query(userRef, where("username", "==", username));

    getDocs(q).then((snapshot) => {
      if (snapshot.empty) {
        addDoc(userRef, {
          username: username,
          password: password,
          likes: [],
        }).then((user) => {
          setUser(true, username, user.id);
          navigate("/home");
        });
      } else {
        const highlight = document.getElementsByClassName("input");
        for (let i = 0; i < highlight.length; i++) {
          highlight[i].style["borderColor"] = "red";
        }
        setError(true);
      }
    });
  };

  return (
    <div className="login-body">
      <div className="login-card">
        <Link to="/home">
          <button className="logo">GameCanvas</button>
        </Link>
        <div className="name">Enter your Username:</div>
        <form onSubmit={handleSubmit}>
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
        </form>
        <div className="signUp">
          Already have an account?
          <Link to="/Login">Log In!</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
