import "../stylesheet/home.css";
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
    <>
      {game ? (
        <div className="center-body">
          <Header />
          <div className="home-card">
            <div className="result">Search Results for "{game}"</div>
            <Grid colRef={q} />
          </div>
        </div>
      ) : (
        <div className="center-body">
          <Header />
          <div className="home-card">
            <div className="genre-title">Genres</div>
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
              <Link to="/genre" state="Adventure">
                <div className="genre">Adventure</div>
              </Link>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Browse;
