import "../stylesheet/profile.css";
import "../stylesheet/grid.css";
import "../stylesheet/home.css";
import {
  getDoc,
  onSnapshot,
  doc,
} from "../database/node_modules/firebase/firestore";
import { db, gameRef } from "../database/src/db";
import Header from "../components/header";
import Pagination from "../components/pagination";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProfileList = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const docRef = doc(db, "Users", user.data);
  const [arr, setArr] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [result, setResult] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [contentPerPage] = useState(12);
  const indexOfLastPost = currentPage * contentPerPage;
  const indexOfFirstPost = indexOfLastPost - contentPerPage;

  // Stores all the users liked games into an array
  useEffect(() => {
    setTimeout(() => {
      getDoc(docRef).then((data) => {
        onSnapshot(gameRef, (snapshot) => {
          setArr(
            snapshot.docs.map((doc) => {
              if (data.data().likes.includes(doc.id)) {
                return doc.data();
              }
            })
          );
          setResult(true);
        });
        setIsPending(false);
      });
    }, 500);
  }, []);

  /* filters out the undefined values */
  const likes = arr.filter((game) => game != undefined);
  const currentPost = likes.slice(indexOfFirstPost, indexOfLastPost);

  // pass this over as a prop to the Pagination component
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="center-body">
      <Header />
      <div className="home-card">
        <div className="favorite">Your Favorites</div>
        {likes.length > 0 ? (
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
              totalPost={likes.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </>
        ) : (
          <div>
            {isPending && <div className="loading">Loading...</div>}
            {result && (
              <div className="result">
                Looks like you don't have any games favorited :&#40;
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileList;
