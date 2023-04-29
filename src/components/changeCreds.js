import "../stylesheet/profile.css";
import {
  doc,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
} from "../database/node_modules/firebase/firestore";
import { userRef } from "../database/src/db";
import { useEffect, useState } from "react";
import { setUser } from "../pages/App";
import { useNavigate } from "react-router-dom";

const ChangeCreds = ({ option, user }) => {
  const [erase, setErase] = useState(false);
  const [modify, setModify] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [change, setChange] = useState();
  const navigate = useNavigate();
  const docRef = doc(userRef, user);

  useEffect(() => {
    if (option == "delete") {
      setErase(true);
    } else if (option == "username" || "password") {
      setModify(true);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

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

  function deleteAccount() {
    deleteDoc(docRef).then(() => {
      setUser(false, "", null);
      navigate("/home");
    });
  }

  return (
    <>
      {modify && (
        <div className="change-details">
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
      )}
      {erase && (
        <div className="change-details">
          <div>Are you sure you want to delete?</div>
          <button onClick={deleteAccount}>Delete</button>
        </div>
      )}
    </>
  );
};

export default ChangeCreds;
