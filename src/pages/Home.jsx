import React, { useState, useEffect } from "react";
import { db, auth } from "../Firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import Delete from "./Delete";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Likes from "./Likes";
import "./css/ArticlePage.css";
import { Container, Button } from "@mui/material";
export default function Home() {
  const [user] = useAuthState(auth);
  const [bloglist, setbloglist] = useState([]);
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  useEffect(() => {
    const articleRef = collection(db, "blogs");
    const q = query(articleRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setbloglist(articles);
      console.log(articles);
    });
  }, []);

  return (
    <div>
      {bloglist.length === 0 ? (
        <p>No Articles found!</p>
      ) : (
        bloglist.map(
          ({
            id,
            Title,
            Message,
            imageUrl,
            createdAt,
            createdBy,
            userId,
            likes,
            comments,
          }) => (
            // Image,createdBy,created-at
            <div className="mt-5" key={id}>
              <div className="shadow-md w-full lg:px-16 contrast-100 shadow-cyan-300/50">
                <div className="flex py-2 lg:py-3 my-auto absolute right-0 lg:bottom-1 bottom-0">
                  {user && <Likes id={id} likes={likes} />}
                  <p sx={{ fontWeight: "regular" }}>{likes?.length} Like</p>
                </div>
                <div className="flex justify-between flex-col md:flex-row">
                  <div className="lg:w-80 drop-shadow-lg lg:pb-6 lg:pt-2 flex flex-col justify-between gap-0 lg:gap-2 mx-auto">
                    <img
                      src={imageUrl}
                      alt="imag-pic"
                      className="shadow-lg h-52 w-52 lg:w-60 lg:h-60 xl:w-80 xl:h-80 mx-auto"
                    />
                    <span className="text-base lg:text-xl gap-4 lg:gap-8 pt-2">
                      Created at: {createdAt.toDate().toDateString()}
                    </span>
                    {createdBy && (
                      <span className="text-base lg:text-xl ">
                        {createdBy.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col w-full lg:px-20 py-10 gap-4">
                    <span className="text-xl lg:text-3xl xl:text-4xl font-bold w-full mb-2">
                      {Title}
                    </span>
                    {
                      <p className="px-10  text-sm lg:text-xs xl:text-base">
                        {isReadMore ? Message.slice(0, 150) : Message}
                        <span
                          onClick={toggleReadMore}
                          className="text-base font-extrabold"
                        >
                          {isReadMore ? (
                            <Link to={`/article/${id}`}>...Read More</Link>
                          ) : (
                            <></>
                          )}
                        </span>
                      </p>
                    }
                    <div className="flex flex-row justify-between lg:px-24 px-16 my-auto">
                      {user && user.uid === userId ? (
                        <div style={{ padding: "10px" }}>
                          <Button variant="contained">
                            <Link
                              to={`/update/${id}`}
                              style={{
                                color: "white",
                                textDecoration: "none",
                              }}
                            >
                              Update
                            </Link>
                          </Button>
                        </div>
                      ) : (
                        <></>
                      )}{" "}
                      <div className="my-auto">
                        {user && user.uid === userId ? (
                          <Delete id={id} imageUrl={imageUrl} />
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )
      )}

      {/* <div className='m-5'>
      <div className='row ' style={{ margin: '2rem', height: '30rem' }}>
        <div className='col-md-6 col-12 col-sm-12 pt-5' >
          <img
           src={imageUrl}
            alt='product picture'
            style={{
              minHeight: '10rem',
              height: '20rem',
              width: '20rem',
              justifyContent: 'center'
            }}
          />
        </div>
        <div className='col-md-6 col-12 col-sm-12 pt-5 '>
          <h3>{Title}</h3>
          <p>{items[id].description}</p>
          <b> <p
                            // className='text'
                            // style={{
                            //   fontSize: '15px',
                            //   boxShadow: ' 3px 3px red, -1em 0 .4em olive;'
                            // }}
                          >
                            {isReadMore ? Message.slice(0, 150) : Message}
                            <span
                              onClick={toggleReadMore}
                              className='read-or-hide'
                            >
                              {isReadMore ? (
                                <Link to={`/article/${id}`}>...Read More</Link>
                              ) : (
                                <></>
                              )}
                            </span>
                          </p>
                        }</b>
          <div className='row mt-3'>
            <div className='col-md-6 col-6'>
              <h5>Price : ${createdAt.toDate().toDateString()}</h5>
            </div>
            <div className='col-md-6 col-6 '>
              <Button
                variant='secondary'
                size='sm'
                onClick={() => setShow(!show)}
              >
                Add Cart 
              </Button>
            </div>
          </div>
        </div>
      </div> 
 */}
    </div>
    // </div>
  );
}



