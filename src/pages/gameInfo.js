import "../stylesheet/gameInfo.css";
import "../stylesheet/home.css";
import {
  getDoc,
  updateDoc,
  doc,
} from "../database/node_modules/firebase/firestore";
import { db } from "../database/src/db";
import Header from "../components/header.js";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const GameInfo = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();
  const title = location.state;
  const [isFavorite, setIsFavorite] = useState(false);
  const [game, setGame] = useState();
  let currentLikes;
  let docRef;

  useEffect(() => {
    setTimeout(() => {
      const gameRef = doc(db, "Games", title);
      getDoc(gameRef).then((doc) => {
        setGame(doc.data());
      });
    }, 500);
  }, []);

  if (user.loggedIn) {
    docRef = doc(db, "Users", user.data);
    getDoc(docRef).then((doc) => {
      currentLikes = doc.data().likes;
      if (currentLikes.includes(title)) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    });
  }

  function handleClick(e, option) {
    if (!user.loggedIn) {
      navigate("/login");
    } else {
      if (option == "check") {
        currentLikes.push(game.title);
        game.favorites++;
      } else {
        currentLikes = currentLikes.filter((title) => title != game.title);
        game.favorites--;
      }

      updateDoc(docRef, {
        likes: currentLikes,
      }).then(() => {
        const gameRef = doc(db, "Games", game.title);
        updateDoc(gameRef, {
          favorites: game.favorites,
        });
        navigate(0, { state: doc.title });
      });
    }
  }

  return (
    <div className="center-body">
      <Header />
      {game ? (
        <div>
          <div className="info-card">
            <img
              className="image"
              src={require(`../images/${game.imgLink}`)}
              alt={game.title}
            />
            <div className="information">
              <div className="title">{game.title}</div>

              <div className="star-container">
                <div>
                  <div className="favorite-count">{game.favorites}</div>
                  {isFavorite ? (
                    <div
                      id="star"
                      className="star-checked"
                      onClick={(event) => handleClick(event, "uncheck")}
                    >
                      &#9733;
                    </div>
                  ) : (
                    <div
                      id="star"
                      className="star-unchecked"
                      onClick={(event) => handleClick(event, "check")}
                    >
                      &#9734;
                    </div>
                  )}
                </div>
              </div>
              <div className="data">Developer: {game.developer}</div>
              <div className="data">Publisher: {game.publisher}</div>
              <div className="data">Release Date: {game.releaseDate}</div>
              <div className="data">Age rating: {game.rating}</div>
              <div className="data">
                Platforms:{" "}
                {game.platforms.map((platform) => {
                  return `${platform}, `;
                })}
              </div>
            </div>
          </div>
          <div className="fill-card">
            <div className="strong">Description:</div>
            <div className="description">{game.description}</div>
            <div className="strong">Genre:</div>
            {game.genres.map((genre) => {
              return (
                <Link to="/genre" state={genre}>
                  <button className="genre-box" key={genre}>
                    {genre}
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="home-card">
          <div className="loading">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default GameInfo;
