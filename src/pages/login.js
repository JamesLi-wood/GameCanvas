import "../stylesheet/login.css";
import { Link, useNavigate } from "react-router-dom";
import { userRef } from "../database/src/db";
import { useState } from "react";
import {
  where,
  query,
  getDocs,
} from "../database/node_modules/firebase/firestore";

const user = {
  loggedIn: false,
  username: "",
  data: null,
};

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = query(
      userRef,
      where("username", "==", username),
      where("password", "==", password)
    );

    getDocs(q).then((snapshot) => {
      if (snapshot.docs.length === 0) {
        const highlight = document.getElementsByClassName("input");
        for (let i = 0; i < highlight.length; i++) {
          highlight[i].style["borderColor"] = "red";
        }
        setError(true);
      } else {
        user.loggedIn = true;
        user.username = username;
        user.data = q;
        navigate("/");
      }
    });
  };

  return (
    <div className="login-body" id="body">
      <div className="login-card">
        <Link to="/">
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
            className="input"
            type="text"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <div className="error">
              Username and Password do not match. <br></br>
              Please try again.
            </div>
          )}
          <button className="login-button" type="submit">
            LOGIN
          </button>
        </form>
        <div className="signUp">
          Don't have an account?
          <Link to="/SignUp">Sign Up!</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

export { user };
