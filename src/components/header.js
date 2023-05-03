import "../stylesheet/header.css";
import { setUser } from "../pages/App";
import { Link, useNavigate } from "react-router-dom";
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

const Header = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [input, setInput] = useState("null");
  const navigate = useNavigate();

  function logOut() {
    setUser(false, "", null);
    navigate("/home");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/browse", { state: input });
    navigate(0);
  };

  return (
    <>
      <div className="header">
        <div className="left-side">
          <Link to="/profile">
            <button className="button">Profile</button>
          </Link>
          <Link to="/browse">
            <button className="button">Browse</button>
          </Link>
          <Link to="/home">
            <button className="button">Home</button>
          </Link>
        </div>
        <div className="middle-side">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setInput(e.target.value)}
              required
            />
            <button>
              <img
                src={require("../images/magnifying-glass.png")}
                alt="magnifying glass"
              />
            </button>
          </form>
        </div>
        <div className="right-side">
          {user.loggedIn ? (
            <div>
              <button className="button" id="user" onClick={activateLogOut}>
                {user.username}
              </button>
              <button className="logOut" id="logOut" onClick={logOut}>
                Log out
              </button>
            </div>
          ) : (
            <Link to="/login">
              <button className="button">Login</button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
