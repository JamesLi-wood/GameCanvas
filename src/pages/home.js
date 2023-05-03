import "../stylesheet/home.css";
import Header from "../components/header.js";
import Grid from "../components/grid.js";
import { colRef } from "../database/src/db";

function Home() {
  return (
    <div className="center-body">
      <Header />
      <div className="home-card">
        <Grid colRef={colRef} />
      </div>
    </div>
  );
}

export default Home;
