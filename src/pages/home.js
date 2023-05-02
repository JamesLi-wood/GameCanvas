import "../stylesheet/app.css";
import Header from "../components/header.js";
import Grid from "../components/grid.js";
import { colRef } from "../database/src/db";

function Home() {
  return (
    <div className="app-body" id="body">
      <div className="body">
        <Header />
        <Grid colRef={colRef} />
      </div>
    </div>
  );
}

export default Home;
