import "../stylesheet/grid.css";
import { onSnapshot } from "../database/node_modules/firebase/firestore";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Grid = ({ colRef }) => {
  const [arr, setArr] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [result, setResult] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      onSnapshot(colRef, (snapshot) => {
        setArr(snapshot.docs.map((doc) => doc.data()));
        setResult(true);
      });
      setIsPending(false);
    }, 500);
  }, []);

  return (
    <>
      {arr.length > 0 ? (
        <div className="grid">
          {arr.map((doc) => {
            return (
              <div className="game-card" key={doc.title}>
                <Link to="/gameInfo" state={doc}>
                  <img
                    src={require(`../images/${doc.imgLink}`)}
                    className="game-image"
                    alt={doc.Title}
                  />
                </Link>
                <div className="game-title">{doc.title}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          {isPending && <div className="loading">Loading...</div>}
          {result && <div className="result">No Result</div>}
        </div>
      )}
    </>
  );
};

export default Grid;
