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

  // checks what the option is and modifies the useState in respect to the option
  useEffect(() => {
    if (option == "delete") {
      setErase(true);
    } else if (option == "username" || "password") {
      setModify(true);
    }
  });

  // using the option type, alters the user's username or password
  const handleSubmit = (e) => {
    e.preventDefault();

    if (option === "username") {
      const q = query(userRef, where("username", "==", change));

      getDocs(q).then((snapshot) => {
        if (snapshot.empty) {
          updateDoc(docRef, {
            username: change,
          }).then(() => {
            setUser(true, change, docRef.id);
            navigate(0);
          });
        } else {
          setError(true);
        }
      });
    } else {
      updateDoc(docRef, {
        password: change,
      });
      setSuccess(true);
    }
  };

  // deletes the user's account
  function deleteAccount() {
    deleteDoc(docRef).then(() => {
      setUser(false, "", null);
      navigate("/home");
    });
  }

  return (
    <>
      {modify && (
        <div className="cred-card">
          <div className="cred-title">Please enter new {option}:</div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={option}
              onChange={(e) => setChange(e.target.value)}
              required
            />
            <button className="cred-submit">Submit</button>
          </form>
          {error && (
            <div className="user-error">Username is already taken.</div>
          )}
          {success && (
            <div className="user-success">Password successfully changed!</div>
          )}
        </div>
      )}
      {erase && (
        <div className="cred-card">
          <div className="cred-title">Are you sure you want to delete?</div>
          <button className="delete" onClick={deleteAccount}>
            Delete
          </button>
        </div>
      )}
    </>
  );
};

export default ChangeCreds;
