import "../stylesheet/home.css";
import { gameRef } from "../database/src/db";
import Header from "../components/header.js";
import Grid from "../components/grid.js";

function Home() {
  return (
    <div className="center-body">
      <Header />
      <div className="home-card">
        <Grid colRef={gameRef} />
      </div>
    </div>
  );
}

export default Home;
