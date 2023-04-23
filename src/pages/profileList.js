import {
  where,
  query,
  getDocs,
  onSnapshot,
} from "../database/node_modules/firebase/firestore";
import { useState, useEffect } from "react";
import { userRef } from "../database/src/db";
import Header from "../components/header";

const ProfileList = () => {
  const [likes, setLikes] = useState([]);
  useEffect(() => {
    onSnapshot(userRef, (snapshot) => {
      snapshot.docs.map((doc) => {
        setLikes(doc.get("likes"));
      });
    });
  }, []);
  console.log(likes);

  return (
    <div className="app-body">
      <Header />
      {likes.map((doc) => {
        return <div key={doc}>{doc}</div>;
      })}
    </div>
  );
};

export default ProfileList;
