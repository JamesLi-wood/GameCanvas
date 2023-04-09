import "../stylesheet/login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-body" id="body">
      <div className="login-card">
        <div className="logo">GameCanvas</div>
        <div className="name">Login</div>
        <input type="text" className="input" placeholder="Username" />
        <input type="text" className="input" placeholder="Password" />
        <button className="login-button">LOGIN</button>
        <div className="signUp">
          Don't have an account?
          <Link to="/">Sign Up!</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
