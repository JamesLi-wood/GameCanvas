import "../stylesheet/gameInfo.css";
import "../stylesheet/browse.css";
import Header from "../components/header";
import Grid from "../components/grid";
import { useLocation, Link } from "react-router-dom";
import { colRef } from "../database/src/db";
import {
  query,
  orderBy,
  startAt,
  endAt,
} from "../database/node_modules/firebase/firestore";

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
        <>
          <div className="genre-list">
            <div className="result">Genres</div>
            <ul>
              <Link to="/genre" state="Action">
                <div className="genre">Action</div>
              </Link>
              <Link to="/genre" state="RPG">
                <div className="genre">RPG</div>
              </Link>
              <Link to="/genre" state="MOBA">
                <div className="genre">MOBA</div>
              </Link>
              <Link to="/genre" state="FPS">
                <div className="genre">FPS</div>
              </Link>
              <Link to="/genre" state="Tactical Shooter">
                <div className="genre">Tactical Shooter</div>
              </Link>
              <Link to="/genre" state="Strategy">
                <div className="genre">Strategy</div>
              </Link>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Browse;
