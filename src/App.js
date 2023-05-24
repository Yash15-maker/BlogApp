import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import AddEditBlog from './pages/AddEditBlog'
import ArticlesPage from './pages/ArticlesPage'
import Header from './pages/Header'
import Update from './pages/Update'

// import Header from './pages/Header'
function App () {
  return (
    <div className='App'>
      <Container>
        <Router>
          <Header />
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/signin' element={<Login />} />
            <Route path='/update/:id' element={<Update />} />
            <Route path='/article/:id' element={<ArticlesPage />} />
            <Route
              exact
              path='/'
              element={
                <div className='row mt-4'>
                  <div className='col-md-7'>
                    <Home />
                  </div>

                  <div className='col-md-4'>
                    <AddEditBlog />
                  </div>
                </div>
              }
            />
          </Routes>
         
        </Router>
      </Container>
    </div>
  )
}

export default App
