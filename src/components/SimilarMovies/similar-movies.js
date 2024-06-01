import styled from "styled-components";
import { useState, useEffect } from "react";
import MovieCard from '../MovieCard/movie-card';

const Container = styled.div`
gap:1rem;
width: 100%;
display: flex;
flex-wrap: wrap;
align-items: flex-start;
justify-content: flex-start;
`

export default function SimilarMovies({movie_id}){
    const [similarMovies, setSimilarMovies] = useState([])
    
    useEffect(()=>{
        fetchSimilaryMovies()
    },[movie_id])

    async function fetchSimilaryMovies(){
        const request_similar_movies = await fetch(`${process.env.REACT_APP_API_URL}/api/movies/${movie_id}/similar/`)
        const similar_movies_list = await request_similar_movies.json();

        if (request_similar_movies.status==200){
            setSimilarMovies(similar_movies_list.data.movies)
        }
    }
   
    
    return(
        <Container>
            {similarMovies.map((movie)=>{
            return(
                <MovieCard 
                key={movie.id} 
                id={movie.id} 
                duration={movie.duration}
                genres={movie.genre}
                rated={movie.contentRate} 
                title={movie.title} 
                imdb={movie.ratings.imdb}
                meta={movie.ratings.meta} 
                plot={movie.plot} 
                director={movie.director} 
                poster={movie.poster} 
                released={movie.released}
                hoverScale={true}/>
            )
            })}
        </Container>
    )
}
