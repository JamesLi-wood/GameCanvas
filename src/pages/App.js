import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

/* Sets the user based on the value, data refers to the 
   userId in firebases Users collection */
function setUser(loggedIn, username, data) {
  sessionStorage.setItem(
    "user",
    JSON.stringify({
      loggedIn: loggedIn,
      username: username,
      data: data,
    })
  );
}

/* Initally sets the user to be none, and navigates to the
   home page. This is only called once. */
function App() {
  const navigate = useNavigate();
  setUser(false, "", null);

  useEffect(() => {
    navigate("/home");
  }, []);
}

export default App;

export { setUser };
