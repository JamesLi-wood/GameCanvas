import "../stylesheet/header.css";
import "../stylesheet/sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { user } from "../pages/login";

const Header = ({ expand }) => {
  const navigate = useNavigate();
  function signOut() {
    user.loggedIn = false;
    user.username = "";
    user.data = null;
    navigate("/");
  }

  return (
    <>
      <div className="header">
        <img
          className="hamburger-button"
          src={require("../images/hamburger.png")}
          alt="hamburger button"
          onClick={expand}
        />
        <div className="middle-side">
          <Link to="/">
            <button className="home-button">GameCanvas</button>
          </Link>
          <input type="text" placeholder="Search" />
          <button className="search-button">
            <img
              src={require("../images/magnifying-glass.png")}
              alt="magnifying glass"
            />
          </button>
        </div>
        <div>
          {user.loggedIn ? (
            <div className="user" onClick={signOut}>
              {user.username}
            </div>
          ) : (
            <Link to="/login">
              <button className="login">Login</button>
            </Link>
          )}
        </div>
      </div>

      <nav id="sidebar" className="sidebar">
        <div className="sidebar-icon">Profile</div>
        <div className="sidebar-icon">Browse</div>
        <div className="sidebar-icon">test</div>
        <div className="sidebar-icon">test</div>
        <div className="sidebar-icon">test</div>
      </nav>
    </>
  );
};

export default Header;
