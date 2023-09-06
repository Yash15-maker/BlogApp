import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../Firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

function Likes({ id, likes }) {
  const [user] = useAuthState(auth);
  const likesRef = doc(db, "blogs", id);
  console.log("Likes", id, user.uid);
  const handleClick = () => {
    if (likes?.includes(user.uid)) {
      updateDoc(likesRef, {
        likes: arrayRemove(user.uid),
      })
        .then(() => {
          console.log(likes);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      updateDoc(likesRef, {
        likes: arrayUnion(user.uid),
      })
        .then(() => {
          console.log(likes);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div>
      <i
        className={`fa fa-heart${!likes?.includes(user.uid) ? "-o" : ""} fa-lg`}
        style={{
          cursor: "pointer",
          color: likes?.includes(user.uid) ? "red" : null,
        }}
        onClick={handleClick}
      />
    </div>
  );
}

export default Likes;
