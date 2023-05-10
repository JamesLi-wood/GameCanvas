import "../stylesheet/home.css";
import "../stylesheet/browse.css";
import {
  query,
  orderBy,
  startAt,
  endAt,
  onSnapshot,
} from "../database/node_modules/firebase/firestore";
import { gameRef, genreRef } from "../database/src/db";
import Header from "../components/header";
import Grid from "../components/grid";
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Browse = () => {
  const location = useLocation();
  const game = location.state;
  const [genres, setGenres] = useState([]);

  const q = query(
    gameRef,
    orderBy("alt"),
    startAt(game),
    endAt(`${game}\uf8ff`)
  );

  useEffect(() => {
    onSnapshot(genreRef, (snapshot) => {
      setGenres(snapshot.docs.map((doc) => doc.data().title));
    });
  }, []);

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
            {genres.map((genre) => {
              return (
                <Link to="/genre" state={genre}>
                  <button className="genre-box">{genre}</button>
                </Link>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Browse;
