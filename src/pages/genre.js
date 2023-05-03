import "../stylesheet/home.css";
import "../stylesheet/browse.css";
import Header from "../components/header";
import { useLocation } from "react-router-dom";
import { query, where } from "../database/node_modules/firebase/firestore";
import { colRef } from "../database/src/db";
import Grid from "../components/grid";

const Genre = () => {
  const location = useLocation();
  const genre = location.state;
  const q = query(colRef, where("genres", "array-contains", genre));

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
