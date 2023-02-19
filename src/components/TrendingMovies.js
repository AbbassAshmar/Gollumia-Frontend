import React, { useEffect,useState } from "react";
import MovieCard from "./Moviecard";
import styled from "styled-components";

export const Container = styled.div`
display: grid;
grid-template-columns:repeat(5 ,1fr);
grid-template-rows: repeat(3, 1fr);
justify-items: start;
gap:3.3rem;
`

export function TrendingMovies(){
    const [trendingMovies , SetTrendingMovies] = useState([])
    useEffect(()=>{
        async function Fetch(){
            const data = await fetch("http://127.0.0.1:8000/api/trending/",{
                method:"GET",
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': ''
                }})
            const resp = await data.json()
            SetTrendingMovies(resp)
            return resp
        }
        Fetch()
    },[])
    useEffect(()=>{console.log(trendingMovies)},[trendingMovies])
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

