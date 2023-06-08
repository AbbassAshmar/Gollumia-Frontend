import React,{useState,useEffect} from "react";
import MoviesGridContainer from "../MoviesGridContainer/movies-grid-container";
function UpcomingMovies(){
    const [upcomingMovies, setUpcomingMovies] = useState([])
    async function Fetch(){
        const request = await fetch("http://127.0.0.1:8000/api/movies/upcoming/")
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