import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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

function App() {
  const navigate = useNavigate();
  setUser(false, "", null);

  useEffect(() => {
    navigate("/home");
  }, []);
}

export default App;

export { setUser };
