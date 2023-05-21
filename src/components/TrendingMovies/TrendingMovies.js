import React, { useEffect,useState } from "react";
import MovieCard from "../MovieCard/Moviecard";
import styled from "styled-components";

export const Container = styled.div`
display: grid;
grid-template-columns:repeat(auto-fit ,minmax(220px,1fr));
overflow:hidden;
justify-items: center;
gap:10px;
width:100%;
padding:1%;

@media screen and (max-width:487px){
    padding-left:0;
    grid-template-columns:repeat(2 ,50%);
}
@media screen and (max-width:390px){
    padding-left:0;
    grid-template-columns:repeat(2 ,50%);
    gap:2px;
}
`

export function TrendingMovies(){
    const [trendingMovies , SetTrendingMovies] = useState([])
    async function Fetch(){
        const request = await fetch("http://127.0.0.1:8000/api/movies/trending/",{method:"GET"})
        const movies_list = await request.json()
        SetTrendingMovies(movies_list["movies"].slice(0.15))
    }
    useEffect(()=>{
        Fetch()
    },[])
    return(
        <Container>
            {
                trendingMovies.map((movie)=>{
                    return <MovieCard page_id={movie.id}
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
                })
            }
        </Container>
    )

}

