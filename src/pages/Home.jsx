import React, { useState, useEffect } from 'react'
import { db, auth } from '../Firebase'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import Delete from './Delete'
import { Link } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import Likes from './Likes'
import './css/ArticlePage.css'
import { Container, Button } from '@mui/material'
export default function Home () {
  const [user] = useAuthState(auth)
  const [bloglist, setbloglist] = useState([])
  const [isReadMore, setIsReadMore] = useState(true)
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore)
  }

  useEffect(() => {
    const articleRef = collection(db, 'blogs')
    const q = query(articleRef, orderBy('createdAt', 'desc'))
    onSnapshot(q, snapshot => {
      const articles = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setbloglist(articles)
      console.log(articles)
    })
  }, [])

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
            comments
          }) => (
            // Image,createdBy,createdat

            <div className='m-5' key={id}>
              <div className='row-5  border mt-2'>
                <>
                  <Container>
                    <div className='row'>
                      <div className='col-md-4 col-11 col-sm-12 pt-5'>
                        <>
                          <img
                            src={imageUrl}
                            alt='title'
                            style={{
                              width: '100%',
                              // marginTop: '35px',
                              height: '15rem',
                              padding: '10px',
                              borderRadius: '50px'
                            }}
                          />
                        </>
                        <p style={{ width: '100%' }}>
                          Created at:
                          <br />
                          <b>{createdAt.toDate().toDateString()}</b>
                        </p>
                        <p>
                          {' '}
                          <div style={{ pading: '20px' }}>
                            <b>Username:</b> {'   '}
                            {createdBy && (
                              <span>{createdBy.toUpperCase()}</span>
                            )}
                          </div>
                        </p>

                        {/* //update */}

                        {user && user.uid === userId ? (
                          <div style={{ padding: '20px', marginLeft: '20px' }}>
                            <Button variant='contained'>
                              <Link
                                to={`/update/${id}`}
                                style={{ color: 'white' }}
                              >
                                Update
                              </Link>
                            </Button>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>

                      {/* Text */}
                      <div className='col-md-6 col-12 col-sm-10 pt-5 '>
                        <h3>{Title}</h3>
                        <>
                          {
                            <p className='textparagraph'>
                              {isReadMore ? Message.slice(0, 150) : Message}
                              <span
                                onClick={toggleReadMore}
                                className='read-or-hide'
                              >
                                {isReadMore ? (
                                  <Link to={`/article/${id}`}>
                                    ...Read More
                                  </Link>
                                ) : (
                                  <></>
                                )}
                              </span>
                            </p>
                          }

                          {/* Delete post */}
                          <div style={{ display: 'flex', padding: '1rem' }}>
                            <div className='col-6 d-flex flex-row-reverse'>
                              {user && user.uid === userId ? (
                                <Delete id={id} imageUrl={imageUrl} />
                              ) : (
                                <div
                                  style={{
                                    fontSize: '15px',
                                    padding: '1.5rem'
                                  }}
                                >
                                  Firstly Create Your Post
                                </div>
                              )}
                            </div>

                            {/* Likes */}

                            <div style={{ padding: '25px', display: 'flex' }}>
                              {user && <Likes id={id} likes={likes} />}
                              <p>{likes?.length} Like</p>
                            </div>
                          </div>

                          {/* Comments */}
                          {comments && comments.length > 0 && (
                            <div className='pe-1'>
                              <p>{comments?.length} comments</p>
                            </div>
                          )}
                        </>
                      </div>
                    </div>
                  </Container>
                </>
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
  )
}
