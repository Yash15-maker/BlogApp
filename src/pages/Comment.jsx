import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../Firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { v4 as uuidv4 } from 'uuid'
import { auth } from './../Firebase'
import "./css/Comment.css"
export default function Comment ({ id }) {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [currentlyLoggedinUser] = useAuthState(auth)
  const commentRef = doc(db, 'blogs', id)
  useEffect(() => {
    const docRef = doc(db, 'blogs', id)
    onSnapshot(docRef, snapshot => {
      setComments(snapshot.data().comments)
    })
  }, [id])

  const handleChangeComment = e => {
    if (e.key === 'Enter') {
      updateDoc(commentRef, {
        comments: arrayUnion({
          user: currentlyLoggedinUser.uid,
          userName: currentlyLoggedinUser.displayName,
          comment: comment,
          createdAt: new Date(),
          commentId: uuidv4()
        })
      }).then(() => {
        setComment('')
      })
    }
  }

  // delete comment function
  const handleDeleteComment = comment => {
    console.log(comment)
    updateDoc(commentRef, {
      comments: arrayRemove(comment)
    })
      .then(e => {
        console.log(e)
      })
      .catch(error => {
        console.log(error)
      })
  }

  if (comments === null) {
  }
  return (
    <div style={{padding: "3.5rem"}}>
      <hr/>
      Comment
      <div className='container'>
        {currentlyLoggedinUser && comments ? (
          comments.map(({ commentId, user, comment, userName, createdAt }) => (
            <div key={commentId}>
              <div className='border p-2 mt-2 row'>
                <div className='col-11'>
                  <span
                    className={`badge ${
                      user === currentlyLoggedinUser.uid
                        ? 'bg-success'
                        : 'bg-primary'
                    }`}
                  >
                    {userName}
                  </span>
                  {comment}
                </div>
                <div className='col-1' >
                  {user === currentlyLoggedinUser.uid && (
                    <i
                      className='fa fa-times'
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        handleDeleteComment({
                          commentId,
                          user,
                          comment,
                          userName,
                          createdAt
                        })
                      }
                    ></i>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            {comments === null ? (
              <>
              Hii
              </>
            ) : (
              comments.map(comm => (
                <div key={comm.commentId}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      padding: '10px',
                      backgroundColor: 'grey'
                    }}
                  >
                    <span style={{ color: 'green', backgroundColor: 'Yellow' }}>
                      {comm.userName}
                    </span>
                    <div style={{ color: 'white' }}>{comm.comment}</div>
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {currentlyLoggedinUser && (
          <input
            type='text'
            // className='form-control mt-4 mb-5'
            id="inputbox"
            value={comment}
            onChange={e => {
              setComment(e.target.value)
            }}
            placeholder='Add a comment'
            onKeyUp={e => {
              handleChangeComment(e)
            }}
          />
        )}
      </div>
    </div>
  )
}
