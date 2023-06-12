import React, { useEffect,useState } from "react";
import MoviesGridContainer from "../MoviesGridContainer/movies-grid-container";


export function TrendingMovies(){
    const [trendingMovies , SetTrendingMovies] = useState([])
    async function Fetch(){
        const request = await fetch("http://127.0.0.1:8000/api/movies/trending/?limit=35")
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

