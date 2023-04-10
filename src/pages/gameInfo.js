import "../stylesheet/gameInfo.css";
import { useLocation } from "react-router-dom";
import Header from "../components/header.js";

function expand() {
  document.getElementById("sidebar").classList.toggle("active");
}

const GameInfo = () => {
  const location = useLocation();
  const doc = location.state;

  return (
    <div className="info-body" id="body">
      <Header expand={expand} />
      <div className="card">
        <img
          className="image"
          src={require(`../images/${doc.ImgLink}`)}
          alt={doc.Title}
        />
        <div className="information">
          <div className="title">{doc.Title}</div>
          <div className="data">Developer: {doc.Developer}</div>
          <div className="data">Publisher: {doc.publisher}</div>
          <div className="data">Release Date: {doc.releaseDate}</div>
          <div className="data">Age rating: {doc.rating}</div>
          <div className="data">
            Platforms:{" "}
            {doc.platforms.map((platform) => {
              return `${platform}, `;
            })}
          </div>
        </div>
      </div>
      <div className="fill-card">
        <div className="strong">Description:</div>
        <div className="description">{doc.Description}</div>
        <div className="strong">Genre:</div>
        {doc.genres.map((genre) => {
          return <div className="genre" key={genre}>{genre}</div>;
        })}
      </div>
    </div>
  );
};

export default GameInfo;
