import React,{useState,useEffect} from "react";
import MoviesGridContainer from "../MoviesGridContainer/movies-grid-container";

function UpcomingMovies(){
    const [upcomingMovies, setUpcomingMovies] = useState([])
    
    async function fetchUpcomingMovies(){
        const request = await fetch(`${process.env.REACT_APP_API_URL}/api/movies/upcoming/?limit=35`)
        const movies_list = await request.json();
        if (request.status == 200)
        setUpcomingMovies(movies_list['movies'])
    }

    useEffect(()=>{
        fetchUpcomingMovies()
    },[])
    
    return(
        <MoviesGridContainer movies={upcomingMovies} />
    )

}

export default UpcomingMovies;