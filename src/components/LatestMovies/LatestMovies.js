import React ,{useEffect,useState} from "react";
import { Container } from "../TrendingMovies/TrendingMovies";
import MovieCard from "../MovieCard/Moviecard";
function LatestMovies(){
    const [latestMovies, SetLatestMovies] = useState([]);
    useEffect(()=>{
        async function Fetch(){
            const data = await fetch("http://127.0.0.1:8000/api/latest/",{method:"GET"})
            const resp = await data.json()
            SetLatestMovies(resp)
            return resp
        }
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