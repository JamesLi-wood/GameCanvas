import "../stylesheet/app.css";
import Header from "../components/header.js";
import Grid from "../components/grid.js";

function expand() {
  let active = document.getElementById("sidebar").classList.toggle("active");
  let body = document.getElementById("body");
  if (active === true) {
    body.style.padding = "100px 50px 0px 250px";
    body.style.transition = "0.4s";
  } else {
    body.style.padding = "100px 50px 0px 50px";
    body.style.transition = "0.4s";
  }
}

function App() {
  return (
    <div className="app-body" id="body">
      <Header expand={expand} />
      <Grid />
    </div>
  );
}

export default App;
