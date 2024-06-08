import styled from "styled-components";
import { useState, useEffect } from "react";
import MovieCard from '../MovieCard/movie-card';
import MoviesGridContainer from "../MoviesGridContainer/movies-grid-container";
import { useParams } from "react-router-dom";


export default function SimilarMovies(){
    const [isLoading, setIsLoading] = useState(true);
    const [similarMovies, setSimilarMovies] = useState([]);
    const {id} = useParams();

    useEffect(()=>{
        fetchSimilarMovies(id)
    },[id])

    async function fetchSimilarMovies(movie_id){
        const request = await fetch(`${process.env.REACT_APP_API_URL}/api/movies/${movie_id}/similar/?limit=13`)
        const response = await request.json();

        if (request.status==200){
            setSimilarMovies(response.data.movies)
        }

        setIsLoading(false);
    }
   
    return(
        <MoviesGridContainer isLoading={isLoading} movies={similarMovies} />
    )
}
