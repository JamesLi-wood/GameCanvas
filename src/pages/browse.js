import "../stylesheet/gameInfo.css";
import "../stylesheet/browse.css";
import Header from "../components/header";
import { useLocation } from "react-router-dom";
import { colRef } from "../database/src/db";
import {
  query,
  orderBy,
  startAt,
  endAt,
} from "../database/node_modules/firebase/firestore";
import Grid from "../components/grid";

function expand() {
  document.getElementById("sidebar").classList.toggle("active");
}

const Browse = () => {
  const location = useLocation();
  const game = location.state;

  const q = query(
    colRef,
    orderBy("alt"),
    startAt(game),
    endAt(`${game}\uf8ff`)
  );

  return (
    // consider using app-body for className
    <div className="info-body">
      <Header expand={expand} />
      {game ? (
        <div>
          <div className="result">Search Results for "{game}"</div>
          <Grid colRef={q} />
        </div>
      ) : (
        <div>Browse</div>
      )}
    </div>
  );
};

export default Browse;
