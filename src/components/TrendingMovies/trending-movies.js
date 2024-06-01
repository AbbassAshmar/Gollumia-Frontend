import React, { useEffect,useState } from "react";
import MoviesGridContainer from "../MoviesGridContainer/movies-grid-container";


export function TrendingMovies(){
    const [trendingMovies , setTrendingMovies] = useState([])

    async function fetchTrendingMovies(){
        const request = await fetch(`${process.env.REACT_APP_API_URL}/api/movies/trending/?limit=35`)
        const movies_list = await request.json()
        if (request.status == 200)
            setTrendingMovies(movies_list["movies"])
    }

    useEffect(()=>{
        fetchTrendingMovies()
    },[])
    
    return(
        <MoviesGridContainer movies={trendingMovies}/>
    )

}

