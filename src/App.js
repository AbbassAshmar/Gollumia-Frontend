import React, { useEffect } from 'react'
import {Routes, Route, useLocation} from 'react-router-dom'
import './App.css';
import LoginPage from "./pages/LoginPage/login-page";
import Home from './pages/HomePage/home-page';
import Register from "./pages/RegistrationPage/register-page";
import {MoviesPage} from './pages/MoviesPage/movies-page';
import Movie from './pages/SingleMoviePage/movie';
import { GoogleOAuthProvider } from '@react-oauth/google';
import UserPage from './pages/UserPage/user-page';
import MoviesCollection from './pages/MoviesCollectionPage/movies-collection-page';
import FavoritesPage from './pages/FavoritesPage/favorites-page';
import TopImdbPage from './pages/TopImdbPage/top-imdb-page';
import DefaultPage from './pages/DefaultPage/default-page';
import SimpleNavbarFooterDefault from './pages/DefaultPage/simple-navbar-footer';

function App() {
  const location = useLocation()

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="App">
        <Routes location={location} key={location.pathname}>

          <Route path="/" element={<SimpleNavbarFooterDefault/>}>
            <Route path='/' element={<Home />}></Route>
            <Route path='register' element={<Register />}></Route>
            <Route path="login" element={<LoginPage />}></Route>
          </Route>

          <Route path="/" element={<DefaultPage navbarStyle={{position:"absolute",top:"0", left:"0", background:"none"}}/>}>
            <Route path="home" element={<MoviesPage />}/>
            <Route path="movies/:id" element={<Movie />}></Route>
          </Route>

          <Route path="/" element={<DefaultPage/>}>
            <Route path="user/:username" element={<UserPage />}></Route>
            <Route path="movies" element={<MoviesCollection/>}></Route>
            <Route path='favorites' element={<FavoritesPage/>}> </Route>
            <Route path="movies/top-imdb/" element={<TopImdbPage/>}> </Route>
          </Route>
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
