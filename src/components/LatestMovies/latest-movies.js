import React ,{useEffect,useState} from "react";
import MoviesGridContainer from "../MoviesGridContainer/movies-grid-container";

function LatestMovies(){
    const [latestMovies, SetLatestMovies] = useState([]);
    
    async function Fetch(){
        const data = await fetch("http://127.0.0.1:8000/api/movies/latest/",{method:"GET"})
        const movies_list = await data.json()
        SetLatestMovies(movies_list['movies'].slice(0,17))
    }

    useEffect(()=>{
        Fetch()
    },[])

    return(
        <MoviesGridContainer movies={latestMovies}/>
    )
}

export default LatestMovies;