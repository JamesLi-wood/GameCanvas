import "../stylesheet/home.css";
import "../stylesheet/browse.css";
import { query, where } from "../database/node_modules/firebase/firestore";
import { gameRef } from "../database/src/db";
import Header from "../components/header";
import Grid from "../components/grid";
import { useLocation } from "react-router-dom";

const Genre = () => {
  const location = useLocation();
  const genre = location.state;
  /* Goes into the Games collection in firebase and queries based on
     the genre. It will then be passed as a prop in the Grid component */
  const q = query(gameRef, where("genres", "array-contains", genre));

  return (
    <div className="center-body">
      <Header />
      <div className="home-card">
        <div className="genre-title">{genre}</div>
        <Grid colRef={q} />
      </div>
    </div>
  );
};

export default Genre;
