import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function expand() {
  document.getElementById("sidebar").classList.toggle("active");
}

const Profile = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.loggedIn) {
      navigate("/login");
    }
  });

  return (
    <div className="app-body">
      <Header expand={expand} />
      {user.username}
    </div>
  );
};

export default Profile;
