import React,{useState,useEffect} from "react";
import MoviesGridContainer from "../MoviesGridContainer/movies-grid-container";

function UpcomingMovies(){
    const [upcomingMovies, setUpcomingMovies] = useState([])
    
    async function Fetch(){
        const request = await fetch(`${process.env.REACT_APP_API_URL}/api/movies/upcoming/`)
        const movies_list = await request.json()
        setUpcomingMovies(movies_list['movies'])
    }

    useEffect(()=>{
        Fetch()
    },[])
    
    return(
        <MoviesGridContainer movies={upcomingMovies} />
    )

}

export default UpcomingMovies;