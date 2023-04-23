import "../stylesheet/profile.css";
import {
  doc,
  query,
  where,
  getDocs,
  updateDoc,
} from "../database/node_modules/firebase/firestore";
import { userRef } from "../database/src/db";
import { useState } from "react";
import { setUser } from "../pages/App";
import { useNavigate } from "react-router-dom";

const ChangeCreds = ({ option, user }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [change, setChange] = useState();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const docRef = doc(userRef, user);

    if (option === "username") {
      const q = query(userRef, where("username", "==", change));

      getDocs(q).then((snapshot) => {
        if (snapshot.docs.length > 0) {
          setError(true);
        } else {
          updateDoc(docRef, {
            username: change,
          }).then(() => {
            setUser(true, change, docRef.id);
            navigate(0);
          });
        }
      });
    } else {
      updateDoc(docRef, {
        password: change,
      });
      setSuccess(true);
    }
  };

  return (
    <div className="test">
      <div>Please enter new {option}:</div>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Username"
          onChange={(e) => setChange(e.target.value)}
          required
        />
        <button>Submit</button>
      </form>
      {error && <div className="error">Username is already taken.</div>}
      {success && <div>Password successfully changed!</div>}
    </div>
  );
};

export default ChangeCreds;
