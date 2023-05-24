import React, { useState } from 'react'
import { TextField, Button,  Stack } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../Firebase'
import { toast } from 'react-toastify'
export default function Register () {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const name = firstName + ' ' + lastName
  const navigate = useNavigate()
  const handleSubmit = async event => {
    event.preventDefault()
    console.log(firstName, lastName, email)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      updateProfile(auth.currentUser, { displayName: name })
      navigate('/')
    } catch (err) {
      toast(err.code, { type: 'error' })
    }
  }

  return (
    <div>
      <React.Fragment>
        <h2>Register Form</h2>
        <form onSubmit={handleSubmit} action={<Link to='/login' />}>
          <Stack spacing={2} direction='row' sx={{ marginBottom: 4 }}>
            <TextField
              type='text'
              variant='outlined'
              color='secondary'
              label='First Name'
              onChange={e => setFirstName(e.target.value)}
              value={firstName}
              fullWidth
              required
            />
            <TextField
              type='text'
              variant='outlined'
              color='secondary'
              label='Last Name'
              onChange={e => setLastName(e.target.value)}
              value={lastName}
              fullWidth
              required
            />
          </Stack>
          <TextField
            type='email'
            variant='outlined'
            color='secondary'
            label='Email'
            onChange={e => setEmail(e.target.value)}
            value={email}
            fullWidth
            required
            sx={{ mb: 4 }}
          />
          <TextField
            type='password'
            variant='outlined'
            color='secondary'
            label='Password'
            onChange={e => setPassword(e.target.value)}
            value={password}
            required
            fullWidth
            sx={{ mb: 4 }}
          />

          <Button variant='outlined' color='secondary' type='submit'>
            Register
          </Button>
        </form>
        <small>
          Already have an account? <Link to='/signin'>Login Here</Link>
        </small>
      </React.Fragment>
    </div>
  )
}
