import React,{useState,useEffect} from "react";
import { Container } from "./TrendingMovies";
import MovieCard from "../MovieCard/Moviecard";
function UpcomingMovies(){
    const [movies, setMovies] = useState([])
    useEffect(()=>{
        async function Fetch(){
            const res = await fetch("http://127.0.0.1:8000/api/upcoming/")
            const data = await res.json()
            setMovies(data)
            return data
        }
        Fetch()
    },[])
    
    return(
        <Container>
        {movies.map((movie)=>{
            return <MovieCard 
            page_id={movie.id} 
            duration={movie.duration}  
            genres={movie.genre} 
            key={movie.id} 
            id={movie.id} 
            rated={movie.contentRate} 
            title={movie.title} 
            imdb={movie.ratings.imdb} 
            meta={movie.ratings.meta} 
            plot={movie.plot} 
            director={movie.director} 
            poster={movie.poster} 
            released={movie.released}
            trailer ={movie.trailer}
            thumbnail= {movie.thumbnail}
            image = {movie.image}/>
        })}
        </Container>
    )

}

export default UpcomingMovies;