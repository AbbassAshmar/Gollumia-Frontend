import React,{useState,useEffect} from "react";
import MoviesGridContainer from "../MoviesGridContainer/movies-grid-container";

function UpcomingMovies(){
    const [isLoading, setIsLoading] = useState(true);
    const [upcomingMovies, setUpcomingMovies] = useState([])
    
    async function fetchUpcomingMovies(){
        const URL = `${process.env.REACT_APP_API_URL}/api/movies/upcoming/?limit=17`;
        const request = await fetch(URL);
        const response = await request.json();

        if (request.status == 200){
            setUpcomingMovies(response.data.movies);
        }

        setIsLoading(false);
    }

    useEffect(()=>{
        fetchUpcomingMovies()
    },[])
    
    return(
        <MoviesGridContainer isLoading={isLoading} movies={upcomingMovies} />
    )

}

export default UpcomingMovies;