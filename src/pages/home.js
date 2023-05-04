import "../stylesheet/home.css";
import Header from "../components/header.js";
import Grid from "../components/grid.js";
import { colRef } from "../database/src/db";
import { query, limit } from "../database/node_modules/firebase/firestore";

function Home() {
  const q = query(colRef, limit(24));

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
