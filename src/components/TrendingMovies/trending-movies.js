import React, { useEffect,useState } from "react";
import MoviesGridContainer from "../MoviesGridContainer/movies-grid-container";


export function TrendingMovies(){
    const [isLoading, setIsLoading] = useState(true);
    const [trendingMovies , setTrendingMovies] = useState([]);

    async function fetchTrendingMovies(){
        const URL = `${process.env.REACT_APP_API_URL}/api/movies/trending/?limit=17`;
        const request = await fetch(URL);
        const response = await request.json();
        
        if (request.status == 200)
        setTrendingMovies(response.data.movies);
        
        setIsLoading(false);
    }

    useEffect(()=>{
        fetchTrendingMovies()
    },[])
    
    return(
        <MoviesGridContainer isLoading={isLoading} movies={trendingMovies}/>
    )

}

