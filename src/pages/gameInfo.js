import "../stylesheet/gameInfo.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  getDoc,
  updateDoc,
  doc,
} from "../database/node_modules/firebase/firestore";
import { db } from "../database/src/db";
import Header from "../components/header.js";

const GameInfo = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();
  const game = location.state;
  let currentLikes;
  let docRef;

  if (user.loggedIn) {
    docRef = doc(db, "Users", user.data);
    getDoc(docRef).then((doc) => {
      currentLikes = doc.data().likes;
      if (doc.data().likes.includes(game.title)) {
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
      } else {
        currentLikes = currentLikes.filter((title) => title != game.title);
      }

      updateDoc(docRef, {
        likes: currentLikes,
      }).then(() => {
        navigate(0);
      });
    }
  }

  return (
    <div className="info-body" id="body">
      <Header/>
      <div className="card">
        <img
          className="image"
          src={require(`../images/${game.imgLink}`)}
          alt={game.Title}
        />
        <div className="information">
          <div className="title">{game.title}</div>
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
            <div className="genre-box" key={genre}>
              {genre}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameInfo;
