import styled from "styled-components";
import { useState, useEffect } from "react";
import MovieCard from '../MovieCard/movie-card';
import MoviesGridContainer from "../MoviesGridContainer/movies-grid-container";


export default function SimilarMovies({movie_id}){
    const [isLoading, setIsLoading] = useState(true);
    const [similarMovies, setSimilarMovies] = useState([]);
    
    useEffect(()=>{
        fetchSimilaryMovies()
    },[movie_id])

    async function fetchSimilaryMovies(){
        const request_similar_movies = await fetch(`${process.env.REACT_APP_API_URL}/api/movies/${movie_id}/similar/?limit=13`)
        const similar_movies_list = await request_similar_movies.json();

        if (request_similar_movies.status==200){
            setSimilarMovies(similar_movies_list.data.movies)
        }

        setIsLoading(false);
    }
   
    
    return(
        <MoviesGridContainer isLoading={isLoading} movies={similarMovies} />
    )
}
