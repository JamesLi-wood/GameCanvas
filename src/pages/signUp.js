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

  /* When the user attempts to sign-up, it'll do 3 things:
     1) Goes into the User collection in firebase and query
        based on the entered username.
     2) If the user does not exist in the User collection,
        it'll create a new user with the provided information.
     3) If the user does exist in the User collection, an error
        message will appear. */
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
              Username already exists. <br></br>
              Please choose another username.
            </div>
          )}
          <button className="login-button">Sign Up</button>
        </form>
        <div className="signUp">
          Already have an account?
          <Link to="/Login">
            <div>Log In!</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
