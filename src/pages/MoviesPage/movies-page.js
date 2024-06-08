import React from "react";
import { useState, useEffect } from "react";
import Crousel from "../../components/Carousel/carousel";
import Title from "../../components/Title/title"
import {TrendingMovies} from "../../components/TrendingMovies/trending-movies"
import LatestMovies from "../../components/LatestMovies/latest-movies"
import UpcomingMovies from "../../components/UpcomingMovies/upcoming-movies";
import styled from "styled-components";

const Container = styled.div`
width: 100%;
background-color: black;
overflow: hidden;
`

const MoviesGrids = styled.section`
gap:4rem;
width:100%;
padding:2rem;
display:flex;
flex-direction: column;
align-items: flex-start;

@media screen and (max-width:800px){
    padding:1rem;
}
`
const MoviesGrid = styled.div`
gap:3rem;
width:100%;
display:flex;
flex-direction: column;
align-items: flex-start;
`


export function MoviesPage(){
    const[carouselMovies, setCarouselMovies]= useState([])

    useEffect(() => {
        fetchCarouselMovies()
    },[])

    async function fetchCarouselMovies(){
        const request =  await fetch(`${process.env.REACT_APP_API_URL}/api/movies/?limit=10`);
        let response = await request.json()
        if(request.ok == true && request.status == 200){
            setCarouselMovies(response.data.movies)                   
        }
    }
    
    return(
        <Container>
            <section>
                <Crousel Moviesdata={carouselMovies} />
            </section>

            <MoviesGrids>
                <MoviesGrid>
                    <Title text="Trending" />
                    <TrendingMovies />
                </MoviesGrid>
                <MoviesGrid>
                    <Title text="Latest" />
                    <LatestMovies />
                </MoviesGrid>
                <MoviesGrid>
                    <Title text="Upcoming" />
                    <UpcomingMovies />
                </MoviesGrid>
            </MoviesGrids>
        </Container>
    )
}
