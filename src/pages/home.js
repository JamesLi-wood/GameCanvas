import "../stylesheet/home.css";
import { gameRef } from "../database/src/db";
import { query, orderBy } from "../database/node_modules/firebase/firestore";
import Header from "../components/header.js";
import Grid from "../components/grid.js";

function Home() {
  /* Goes into the Games collection in firebase and queries based 
     on the highest liked games. It will then be passed as a prop 
     in the Grid component */
  const q = query(gameRef, orderBy("favorites", "desc"));

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
