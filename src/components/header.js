import "../stylesheet/header.css";
import "../stylesheet/sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { user } from "../pages/login";

function activateLogOut() {
  const active = document.getElementById("user").classList.toggle("active");
  let logOut = document.getElementById("logOut");

  if (active) {
    logOut.style.opacity = 1;
    logOut.style.pointerEvents = "visible";
  } else {
    logOut.style.opacity = 0;
    logOut.style.pointerEvents = "none";
  }
}

const Header = ({ expand }) => {
  const navigate = useNavigate();
  function logOut() {
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
            <div className="user-container">
              <div className="user" id="user" onClick={activateLogOut}>
                {user.username}
              </div>
              <div className="logOut" id="logOut" onClick={logOut}>
                Log out
              </div>
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
