import React, { useState, useEffect } from 'react'
import { db, auth } from '../Firebase'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import Delete from './Delete'
import { Link } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import Likes from './Likes'
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
        <p>No articles found!</p>
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
            <div
              className='border mt-3 p-7 bg-light'
              key={id}
              style={{ padding: '30px' }}
            >
              <div className='row'>
                <div className='col-3'>
                  <>
                    <img
                      src={imageUrl}
                      alt='title'
                      style={{
                        height: 180,
                        width: 180,
                        marginTop: '30px',
                        borderRadius: '50px'
                      }}
                    />
                  </>
                  <p style={{ marginTop: '50px', width: '200px' }}>
                    Created at:
                    <br />
                    <b>{createdAt.toDate().toDateString()}</b>
                  </p>

                  {user && user.uid === userId ? (
                    <div style={{ padding: '20px' ,marginLeft: "20px"}}>
                      {/* <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        fill='currentColor'
                        class='bi bi-pen'
                        viewBox='0 0 16 16'
                      >
                        <path d='m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z' />
                      </svg> */}

                      <Link to={`/update/${id}`}>Update</Link>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>

                <div className='col-9 ps-5'>
                  <div
                    className='row'
                    style={{
                      padding: '50px',
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      flexDirection: 'column'
                    }}
                  >
                    <div className='col-6' style={{ marginBottom: '20px' }}>
                      {createdBy && (
                        <span className='badge bg-primary'>{createdBy}</span>
                      )}
                    </div>
                    <h4>Heading: {Title}</h4>
                    <div>
                      <>
                        {
                          <p className='text' style={{ fontSize: '15px',boxShadow: ' 3px 3px red, -1em 0 .4em olive;' }}>
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
                        }
                      </>
                    </div>

                    <div style={{ display: 'flex', padding: '5px' }}>
                      <div className='col-6 d-flex flex-row-reverse'>
                        {user && user.uid === userId ? (
                          <Delete id={id} imageUrl={imageUrl} />
                        ) : (
                          <div style={{ fontSize: '15px', padding: '15px' }}>
                            Firstly Create Your Post
                          </div>
                        )}
                      </div>

                      <div style={{ padding: '25px', display: 'flex' }}>
                        {user && <Likes id={id} likes={likes} />}
                        <p>{likes?.length} Like</p>
                      </div>
                    </div>
                    {comments && comments.length > 0 && (
                      <div className='pe-1'>
                        <p>{comments?.length} comments</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        )
      )}
    </div>
  )
}
