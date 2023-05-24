import React, { useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { db } from '../Firebase'

import { toast } from 'react-toastify'
import { doc, updateDoc } from 'firebase/firestore'

const BlogEdit = () => {
  const { id } = useParams()
  const navigate=useNavigate();
  const [title, SetTitle] = useState('')
  const [body, SetBody] = useState('')

  const submit = e => {
    e.preventDefault()
    console.log(title, body)
    updateDoc(doc(db, 'blogs', id), {
      Title: title,
      Message: body
    })
      .then(() => {
        toast('Article added successfully', { type: 'success' })
        navigate('/')
      })
      .catch(err => {
        alert('err')
      })
  }
  return (
    <div>
      <form
        onSubmit={e => {
          submit(e)
        }}
        style={{display: "flex",flexDirection: "column",justifyContent: "space-around",padding: "50px"}}
      >
        <h3>Update Form</h3>
        <label for='title'>Title</label>
        <input
          type='text'
          id='fname'
          name='title'
          value={title}
          placeholder='Enter the title'
          onChange={e => {
            SetTitle(e.target.value)
          }}
          required
        />
        <label for='message'>Message</label>
        <input
          type='text'
          id='lname'
          name='lname'
          value={body}
          placeholder='Enter the Message'
          onChange={e => {
            SetBody(e.target.value)
          }}
          required
        />
        <hr/>
        <button type='submit' style={{width: "100%",}}>Submit</button>
      </form>
    </div>
  )
}
export default BlogEdit
