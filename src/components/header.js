import "../stylesheet/header.css";
import "../stylesheet/sidebar.css";
import { Link } from "react-router-dom";

const Header = ({ expand }) => {
  return (
    <div>
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
        <Link to="/login">
          <button className="login">Login</button>
        </Link>
      </div>

      <nav id="sidebar" className="sidebar">
        <div className="sidebar-icon">Profile</div>
        <div className="sidebar-icon">Browse</div>
        <div className="sidebar-icon">test</div>
        <div className="sidebar-icon">test</div>
        <div className="sidebar-icon">test</div>
      </nav>
    </div>
  );
};

export default Header;
