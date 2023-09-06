import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddEditBlog from "./pages/AddEditBlog";
import ArticlesPage from "./pages/ArticlesPage";
import Header from "./pages/Header";
import Update from "./pages/Update";
import Nf from "./pages/Nf";
// import ProfileCard from "./pages/ProfileCard";
import React, { useState } from "react";

// import Header from './pages/Header'
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Container>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/article/:id" element={<ArticlesPage />} />
            <Route
              exact
              path="/"
              element={
                <div className="row mt-4">
                  <AddEditBlog />
                  <Home />
                </div>
              }
            />
            {/* <Route path="/profile" element={<ProfileCard />} /> */}
            <Route path="/not-found" element={<Nf />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;
