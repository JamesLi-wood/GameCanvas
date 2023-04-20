import "../stylesheet/app.css";
import Header from "../components/header.js";
import Grid from "../components/grid.js";
import { colRef } from "../database/src/db";

function expand() {
  let active = document.getElementById("sidebar").classList.toggle("active");
  let body = document.getElementById("body");
  if (active) {
    body.style.padding = "100px 50px 0px 250px";
    body.style.transition = "0.4s";
  } else {
    body.style.padding = "100px 50px 0px 50px";
    body.style.transition = "0.4s";
  }
}

function Home() {
  return (
    <div className="app-body" id="body">
      <div className="body">
        <Header expand={expand} />
        <Grid colRef={colRef} />
      </div>
    </div>
  );
}

export default Home;
