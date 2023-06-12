import styles from "../../pages/SingleMoviePage/movie.module.css"
import { useEffect, useState} from "react";
import MovieCard from '../MovieCard/movie-card'

function SimilarMovies({movie_id}){

    const [similarMovies, setSimilarMovies] = useState([])

    async function fetchMovies(){
        const request_similar_movies = await fetch(`http://127.0.0.1:8000/api/movies/${movie_id}/similar/`)
        const similar_movies_list = await request_similar_movies.json();
        if (request_similar_movies.status==200){
            setSimilarMovies(similar_movies_list["movies"])
        }
    }
    useEffect(()=>{
        fetchMovies()
    },[])
    
    return(
        <div className={styles.similarMovies}>
            {similarMovies.map((movie)=>{
            return(
            <MovieCard 
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
            hoverScale={true}/>)
            })}
        </div>
    )
}

export default SimilarMovies;