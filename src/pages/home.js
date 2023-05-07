import "../stylesheet/home.css";
import { gameRef } from "../database/src/db";
import { query, limit } from "../database/node_modules/firebase/firestore";
import Header from "../components/header.js";
import Grid from "../components/grid.js";

function Home() {
  const q = query(gameRef, limit(24));

  return (
    <div className="center-body">
      <Header />
      <div className="home-card">
        <Grid colRef={q} />
      </div>
    </div>
  );
}

export default Home;
