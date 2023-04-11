import styles from "../../pages/SingleMoviePage/movie.module.css"
import { useEffect, useState} from "react";
import {useCookies} from "react-cookie"
import MovieCard from '../MovieCard/Moviecard'
function SimilarMovies(props){
    const [cookies,setCookies] = useCookies(['token'])
    const [movies, setMovies] = useState([])
    async function fetchMovies(){
        const data = {
            page_id : props.movie_id
        }
        const response = await fetch("http://127.0.0.1:8000/api/similarmovies/",{
            method:"post",
            body: JSON.stringify(data),
            headers:{
                "Content-type":"application/json",
                "Authorization":"Token "+cookies.token[0]
            }
        })
        const jsonResponse = await response.json();
        setMovies(jsonResponse)
        console.log(jsonResponse)
        
        return jsonResponse
    }
    useEffect(()=>{
        fetchMovies()
    },[])
    
    return(
        <div className={styles.similarMovies}>
            {movies.map((movie)=>{
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