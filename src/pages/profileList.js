import "../stylesheet/profile.css";
import "../stylesheet/grid.css";
import "../stylesheet/home.css";
import {
  getDoc,
  onSnapshot,
  doc,
} from "../database/node_modules/firebase/firestore";
import { db, colRef } from "../database/src/db";
import Header from "../components/header";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProfileList = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const docRef = doc(db, "Users", user.data);
  const [arr, setArr] = useState([]);

  useEffect(() => {
    getDoc(docRef).then((data) => {
      onSnapshot(colRef, (snapshot) => {
        setArr(
          snapshot.docs.map((doc) => {
            if (data.data().likes.includes(doc.id)) {
              return doc.data();
            }
          })
        );
      });
    });
  }, []);
  const likes = arr.filter((game) => game != undefined);

  return (
    <div className="center-body">
      <Header />
      <div className="home-card">
        <div className="favorite">Your Favorites</div>
        <div className="grid">
          {likes.map((doc) => {
            return (
              <div className="game-card" key={doc.title}>
                <Link to="/gameInfo" state={doc.title}>
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
      </div>
    </div>
  );
};

export default ProfileList;
