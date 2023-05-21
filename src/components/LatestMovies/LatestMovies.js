import React ,{useEffect,useState} from "react";
import { Container } from "../TrendingMovies/TrendingMovies";
import MovieCard from "../MovieCard/Moviecard";
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
    <Container>
        {
            latestMovies.map((movie)=>{
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
                image = {movie.image}
                />
            })
        }
    </Container>
    
    )
}

export default LatestMovies;