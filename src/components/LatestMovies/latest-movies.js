import React ,{useEffect,useState} from "react";
import MoviesGridContainer from "../MoviesGridContainer/movies-grid-container";

function LatestMovies(){
    const [isLoading, setIsLoading] = useState(true);
    const [latestMovies, setLatestMovies] = useState([]);
    
    async function fetchLatestMovies(){
        const URL =`${process.env.REACT_APP_API_URL}/api/movies/latest/?limit=17`;
        const request = await fetch(URL);
        const response = await request.json()

        if(request.status == 200)
        setLatestMovies(response.data.movies)

        setIsLoading(false);
    }

    useEffect(()=>{
        fetchLatestMovies()
    },[])

    return(
        <MoviesGridContainer isLoading={isLoading} movies={latestMovies}/>
    )
}

export default LatestMovies;