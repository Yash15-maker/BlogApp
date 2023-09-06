import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { auth, db } from "../Firebase";
// import Likes from "./Likes";
import Comment from "./Comment";
// import { Button } from "@mui/material";
// import "./css/ArticlePage.css";

import { WhatsappShareButton, WhatsappIcon } from "react-share";

export default function ArticlesPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [user] = useAuthState(auth);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
  };

  const shareUrl = copied;

  useEffect(() => {
    const docRef = doc(db, "blogs", id);
    onSnapshot(docRef, (snapshot) => {
      setArticle({ ...snapshot.data(), id: snapshot.id });
    });
  }, []);
  return (
    <div>
      {article ? (
        <div className="w-full px-0">
          <div className="mt-10 pb-4">
            <div className="flex justify-center">
              <img src={article.imageUrl} className="w-96 h-full" />
            </div>
          </div>
          <hr></hr>
          <div className="flex flex-row lg:gap-20 gap-8 flex-around w-full">
            <span className="text-xl font-bold">Title: {article.Title}</span>
            <span className="text-base my-auto">
              {article.createdAt.toDate().toDateString()}
            </span>
          </div>
          <hr></hr>
          <div className="flex flex-col pt-4">
            {" "}
            <div className="w-full">
              <p>{article.Message}</p>
            </div>
            <React.Fragment>
              <Comment id={article.id} />
            </React.Fragment>
          </div>
        </div>
      ) : (
        <>
          <span className="tex-7xl p-20">
            Not FOund Articles related to your Id!
          </span>
        </>
      )}
    </div>
  );
}
