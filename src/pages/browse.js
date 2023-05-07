import "../stylesheet/home.css";
import "../stylesheet/browse.css";
import {
  query,
  orderBy,
  startAt,
  endAt,
} from "../database/node_modules/firebase/firestore";
import { gameRef } from "../database/src/db";
import Header from "../components/header";
import Grid from "../components/grid";
import { useLocation, Link } from "react-router-dom";

const Browse = () => {
  const location = useLocation();
  const game = location.state;

  const q = query(
    gameRef,
    orderBy("alt"),
    startAt(game),
    endAt(`${game}\uf8ff`)
  );

  return (
    <div className="center-body">
      <Header />
      <div className="home-card">
        {game ? (
          <>
            <div className="result">Search Results for "{game}"</div>
            <Grid colRef={q} />
          </>
        ) : (
          <ul>
            <div className="genre-title">Genres</div>
            <Link to="/genre" state="Action">
              <button className="genre-box">Action</button>
            </Link>
            <Link to="/genre" state="RPG">
              <button className="genre-box">RPG</button>
            </Link>
            <Link to="/genre" state="MOBA">
              <button className="genre-box">MOBA</button>
            </Link>
            <Link to="/genre" state="FPS">
              <button className="genre-box">FPS</button>
            </Link>
            <Link to="/genre" state="Tactical Shooter">
              <button className="genre-box">Tactical Shooter</button>
            </Link>
            <Link to="/genre" state="Strategy">
              <button className="genre-box">Strategy</button>
            </Link>
            <Link to="/genre" state="Adventure">
              <button className="genre-box">Adventure</button>
            </Link>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Browse;
