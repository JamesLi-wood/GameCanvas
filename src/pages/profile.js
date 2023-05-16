import "../stylesheet/profile.css";
import "../stylesheet/home.css";
import Header from "../components/header";
import ChangeCreds from "../components/changeCreds";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Profile = () => {
  const [option, setOption] = useState();
  const [active, setActive] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();

  // If the user isn't logged in, redirect the user to the login page
  useEffect(() => {
    if (!user.loggedIn) {
      navigate("/login");
    }
  });

  /* Opens up the ChangeCreds component and passes the option as
     as the prop */
  const handleSubmit = (e, option) => {
    e.preventDefault();
    const active = document.getElementById("change").classList.toggle("active");

    if (active) {
      setOption(option);
      setActive(true);
    } else {
      setActive(false);
    }
  };

  return (
    <div className="center-body">
      <Header />
      <div className="profile-card">
        <div className="username">{user.username}</div>
        <div className="profile-text">Activity</div>
        <Link to="/profileList">
          <button className="profile-button">View List</button>
        </Link>
        <div className="profile-text">Account Details</div>
        <button
          className="profile-button"
          id="change"
          onClick={(event) => handleSubmit(event, "username")}
        >
          Change username
        </button>
        <button
          className="profile-button"
          id="change"
          onClick={(event) => handleSubmit(event, "password")}
        >
          Change password
        </button>
        <button
          className="profile-button"
          id="change"
          onClick={(event) => handleSubmit(event, "delete")}
        >
          Delete account
        </button>
        {active && <ChangeCreds option={option} user={user.data} />}
      </div>
    </div>
  );
};

export default Profile;
