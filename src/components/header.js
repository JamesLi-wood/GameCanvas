import "../stylesheet/header.css";
import "../stylesheet/sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { user } from "../pages/login";
import { useState } from "react";

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
  const [input, setInput] = useState("null");

  function logOut() {
    user.loggedIn = false;
    user.username = "";
    user.data = null;
    navigate("/");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/browse", { state: input });
    navigate(0);
  };

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
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setInput(e.target.value)}
              required
            />
            <button className="search-button">
              <img
                src={require("../images/magnifying-glass.png")}
                alt="magnifying glass"
              />
            </button>
          </form>
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
        <button className="sidebar-icon">Profile</button>
        <Link to="/browse">
          <button className="sidebar-icon">Browse</button>
        </Link>
        <button className="sidebar-icon">Test</button>
        <button className="sidebar-icon">Test</button>
        <button className="sidebar-icon">Test</button>
      </nav>
    </>
  );
};

export default Header;
