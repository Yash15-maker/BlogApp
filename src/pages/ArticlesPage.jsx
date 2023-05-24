import { doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useParams } from 'react-router-dom'
import { auth, db } from '../Firebase'
import Likes from './Likes'
import Comment from './Comment'
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon
} from 'react-share'
import { toast } from 'react-toastify'

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
    <div className='container border bg-light' style={{ marginTop: 70 }}>
      <div className='d-flex flex-row-reverse'>
        <button style={{ width: '10%' }} onClick={copy}>
          {!copied
            ? 'Copy'
            :'Copied'
            }
        </button>
        <div style={{ width: '30%' }}>
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
        <div className='row'>
          <div className='col-3'>
            <img
              src={article.imageUrl}
              alt={article.Title}
              style={{ width: '100%', padding: 10 }}
            />
            <h6 style={{ fontSize: '10px' }}>Author: {article.createdBy}</h6>
            <div style={{ fontSize: '10px' }}>
              {' '}
              Posted on: {article.createdAt.toDate().toDateString()}
            </div>
          </div>
          <div className='col-9 mt-3'>
            <h2 style={{ float: 'left', fontSize: '20px' }}>{article.Title}</h2>
            <div style={{ padding: '40px' }}>
              <h4 style={{ textAlign: 'center' }}>{article.Message}</h4>
            </div>
            <div className='d-flex flex-row-reverse'>
              {user && <Likes id={id} likes={article.likes} />}
              <div className='pe-2'>
                <p>{article.likes.length}</p>
              </div>
            </div>
            <hr />

            {/* comment  */}
            {/* {user!==null?:(
              <>
              Hii Every One
              </>
            )} */}

            <Comment id={article.id} />
          </div>
        </div>
      )}
    </div>
  )
}
