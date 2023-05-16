import "../stylesheet/grid.css";
import { onSnapshot } from "../database/node_modules/firebase/firestore";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "./pagination";

const Grid = ({ colRef }) => {
  const [arr, setArr] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [result, setResult] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [contentPerPage] = useState(12);
  const indexOfLastPost = currentPage * contentPerPage;
  const indexOfFirstPost = indexOfLastPost - contentPerPage;
  const currentPost = arr.slice(indexOfFirstPost, indexOfLastPost);

  // gets all the games inside the collection reference
  useEffect(() => {
    setTimeout(() => {
      onSnapshot(colRef, (snapshot) => {
        setArr(snapshot.docs.map((doc) => doc.data()));
        setResult(true);
      });
      setIsPending(false);
    }, 500);
  }, []);

  // pass this over as a prop to the Pagination component
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {arr.length > 0 ? (
        <>
          <div className="grid">
            {currentPost.map((doc) => {
              return (
                <div className="game-card" key={doc.title}>
                  <Link to="/gameInfo" state={doc.title}>
                    <img
                      src={require(`../images/${doc.imgLink}`)}
                      className="game-image"
                      alt={doc.title}
                    />
                  </Link>
                  <div className="game-title">{doc.title}</div>
                </div>
              );
            })}
          </div>
          <Pagination
            contentPerPage={contentPerPage}
            totalPost={arr.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
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
