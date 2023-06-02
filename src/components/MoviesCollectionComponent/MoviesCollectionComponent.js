import { useEffect } from "react";
import MovieCard from "../MovieCard/Moviecard";
import { Container } from "../TrendingMovies/TrendingMovies";


function MoviesCollectionComp(props){

    return (
        <Container>
            {props.movies && props.movies.length >= 1?props.movies.map((movie)=>{
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
                />
            }):<div style={{color:"white",fontSize:"2rem"}}>No Movies available</div>}
        </Container>
    )
}
export default MoviesCollectionComp;