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
    <div className="info-body">
      <Header />
      <div className="result">{genre}</div>
      <Grid colRef={q} />
    </div>
  );
};

export default Genre;
