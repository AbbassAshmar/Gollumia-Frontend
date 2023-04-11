import React from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css';
import LoginPage from "./pages/LoginPage/login";
import Home from './pages/HomePage/Home';
import Register from "./pages/RegistrationPage/Register";
import MoviesPage from './pages/MoviesPage/moviesPage';
import Movie from './pages/SingleMoviePage/movie';
import { GoogleOAuthProvider } from '@react-oauth/google';
import UserPage from './pages/UserPage/userPage';
import CategorizedMovies from './pages/CategoriesMoviePage/AllMoviesByCat';

function App() {
  return (
    <GoogleOAuthProvider clientId="798671795051-c95amd54jght2rvvkbnqog71ilut2kch.apps.googleusercontent.com">
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='register' element={<Register />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="movies" element={<MoviesPage />}></Route>
          <Route path="movies/:id" element={<Movie />}></Route>
          <Route path="movies/user/:username" element={<UserPage />}></Route>
          <Route path="movies/category/:category/:id" element={<CategorizedMovies/>}></Route>
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
