import React from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css';
import LoginPage from "./pages/LoginPage/login-page";
import Home from './pages/HomePage/home-page';
import Register from "./pages/RegistrationPage/register-page";
import {MoviesPage} from './pages/MoviesPage/movies-page';
import Movie from './pages/SingleMoviePage/movie';
import { GoogleOAuthProvider } from '@react-oauth/google';
import UserPage from './pages/UserPage/user-page';
import {CategorizedMovies} from './pages/CategoriesMoviePage/category-movies-page';
import MoviesCollection from './pages/MoviesCollectionPage/movies-collection-page';
import FavoritesPage from './pages/FavouritesPage/favorite-movies-page';
import TopImdbPage from './pages/TopImdbPage/top-imdb-page';
import SearchPage from './pages/SearchPage/search-page';
function App() {
  return (
    <GoogleOAuthProvider clientId="798671795051-c95amd54jght2rvvkbnqog71ilut2kch.apps.googleusercontent.com">
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='register' element={<Register />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="home" element={<MoviesPage />}></Route>
          <Route path="movies/:id" element={<Movie />}></Route>
          <Route path="user/:username" element={<UserPage />}></Route>
          <Route path="movies/category/:category" element={<CategorizedMovies/>}></Route>
          <Route path="movies" element={<MoviesCollection/>}></Route>
          <Route path='movies/:id/favorites/' element={<FavoritesPage/>}> </Route>
          <Route path="movies/top-imdb/" element={<TopImdbPage/>}> </Route>
          {/* <Route path="movies/search/:searchedKeyWord" element={<SearchPage/>}></Route> */}
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
