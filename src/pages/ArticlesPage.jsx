import { doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useParams } from 'react-router-dom'
import { auth, db } from '../Firebase'
import Likes from './Likes'
import Comment from './Comment'
import { Button } from '@mui/material'
import './css/ArticlePage.css'

import { WhatsappShareButton, WhatsappIcon } from 'react-share'

export default function ArticlesPage () {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [user] = useAuthState(auth)
  const [copied, setCopied] = useState(false)

  const copy = () => {
    const el = document.createElement('input')
    el.value = window.location.href
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    setCopied(true)
  }

  const shareUrl = copy

  useEffect(() => {
    const docRef = doc(db, 'blogs', id)
    onSnapshot(docRef, snapshot => {
      setArticle({ ...snapshot.data(), id: snapshot.id })
    })
  }, [])
  return (
    <div>
      <div className='d-flex flex-row-reverse' style={{ margin: '3rem' }}>
        <button style={{ width: '20%' }} onClick={copy}>
          {!copied ? 'Copy' : 'Copied'}
        </button>
        <div style={{ width: '40%' }}>
          <WhatsappShareButton
            url={shareUrl}
            quote={'THe blog app Link share with you '}
            hashtag={'#portfolio...'}
          >
            <WhatsappIcon size={40} round={true} />
          </WhatsappShareButton>
        </div>
      </div>

      {article && (
        // <div className='row'>
        //   <div className='col-2'>
        //     <img
        //       src={article.imageUrl}
        //       alt={article.Title}
        //       style={{ width: '100%', padding: 10 }}
        //     />
        //     <h6 style={{ fontSize: '10px' }}>Author: {article.createdBy}</h6>
        //     <div style={{ fontSize: '10px' }}>
        //       {' '}
        //       Posted on: {article.createdAt.toDate().toDateString()}
        //     </div>
        //   </div>
        //   <div className='col-9 mt-3'>
        //     <h2 style={{ float: 'left', fontSize: '20px' }}>{article.Title}</h2>
        //     <div style={{ padding: '40px' }}>
        //       <h5 style={{ textAlign: 'center' }}>{article.Message}</h5>
        //     </div>
        //     <div className='d-flex flex-row-reverse'>
        //       {user && <Likes id={id} likes={article.likes} />}
        //       <div className='pe-2'>
        //         <p>{article.likes.length}</p>
        //       </div>
        //     </div>
        //     <hr />

        //     {/* comment  */}
        //     {/* {user!==null?:(
        //       <>
        //       Hii Every One
        //       </>
        //     )} */}

        //     <Comment id={article.id} />
        //   </div>
        // </div>
        <>
          <div className='m-5'>
            <div className='row ' style={{ margin: '2rem', height: '30rem' }}>
              <div className='col-md-6 col-12 col-sm-12 pt-5'>
                <img
                  src={article.imageUrl}
                  alt={article.Title}
                  style={{
                    minHeight: '10rem',
                    height: '20rem',
                    width: '100%',
                    justifyContent: 'center'
                  }}
                />
                <>
                  <h5>Author: {article.createdBy}</h5>
                </>
              </div>

              <div className='col-md-6 col-12 col-sm-12 pt-5 '>
                <h3>{article.Title}</h3>
                <p  className="para">{article.Message}</p>
                <b>Posted on: {article.createdAt.toDate().toDateString()}</b>
                <div className='row mt-4'>
                  <div className='col-md-10 col-8 '>
                    <p>
                          {user && <Likes id={id} likes={article.likes} />}
                      <div className=''>
                        <p>{article.likes.length} Likes</p>
                      </div>
                    </p>
                  </div>
                </div>
              </div>

              <React.Fragment>
                <Comment id={article.id} />
              </React.Fragment>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
