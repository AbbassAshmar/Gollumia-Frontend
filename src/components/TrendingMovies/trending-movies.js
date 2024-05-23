import React, { useEffect,useState } from "react";
import MoviesGridContainer from "../MoviesGridContainer/movies-grid-container";


export function TrendingMovies(){
    const [trendingMovies , SetTrendingMovies] = useState([])

    async function Fetch(){
        const request = await fetch(`${process.env.REACT_APP_API_URL}/api/movies/trending/?limit=35`)
        const movies_list = await request.json()
        SetTrendingMovies(movies_list["movies"])
    }

    useEffect(()=>{
        Fetch()
    },[])
    
    return(
        <MoviesGridContainer movies={trendingMovies}/>
    )

}

