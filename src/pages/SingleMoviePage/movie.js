import React, { useState,useEffect } from "react";
import {useParams } from "react-router-dom";
import styled from "styled-components";
import SimilarMovies from '../../components/SimilarMovies/similar-movies'
import Trailer from "./Trailer/trailer";
import CommentSection from "../../components/CommentSection/comment-section";
import AboveTheFolds from "./sections/above-the-folds";
import imdbLogo from "../../photos/imdbLogo.png";
import metaLogo from "../../photos/metaLogo.png";
import Title from "../../components/Title/title";

const Container  = styled.div`
min-height:100%;
overflow:hidden;
background:black;
`

const ContentContainer = styled.div`
width:100%;
background:black;
gap: 4rem;
display: flex;
flex-direction: column;
`

const Content =styled.div`
width:100%;
padding: 0 2rem;
background:black;
gap: 4rem;
display: flex;
flex-direction: column;
`

const SectionContainer  = styled.div`
gap:3rem;
display: flex;
flex-direction: column;
align-items: flex-start;
`

const Ratings = styled.div`
gap:4rem;
width: fit-content;
margin:auto;
padding:1rem 2rem;
display: flex;
border-radius: 8px;
background-color: rgba(255,165,0,.25);
`
const Rating = styled.div`
gap:1rem;
color:white;
display: flex;
font-weight: bold;
align-items: center;
font-size: var(--heading-5);
`
const RatingLogo = styled.img`
width:36px;
height:36px;
`

function Movie(){
    const {id} = useParams();
    const [movieData, setMovieData ] = useState({})

    async function fetchMovieData (id){
        const request = await fetch(`${process.env.REACT_APP_API_URL}/api/movies/${id}/`);
        const response = await request.json();
        if (request.status == 200){
            setMovieData(response)
        }
    }

    useEffect(()=>{
        fetchMovieData(id)
    },[id])
    
    function getAverageRating (){
        if (!movieData.ratings) return "N/A";
        if (!movieData.ratings?.imdb && !movieData.ratings?.metacritics) return 'N/A';

        let sum = 0;
        let count = 1;

        if (movieData.ratings.imdb && movieData.ratings.imdb !="N/A"){
            sum += parseFloat(movieData.ratings.imdb);
        }

        if (movieData.ratings.metacritics && movieData.ratings.metacritics !="N/A"){
            sum += parseFloat(movieData.ratings.metacritics) / 10;
            count ++;
        }

        return sum / count;
    }

    return(
        <Container>
            <ContentContainer>
                <AboveTheFolds movie={movieData} />
                <Content>
                    <Ratings>
                        <Rating>
                            {movieData?.ratings?.imdb || "N/A"} /10
                            <RatingLogo style={{width:"42px", height:"42px"}} src={imdbLogo}/>
                        </Rating>
                        <Rating>
                            {movieData?.ratings?.metacritics || "N/A"} /100
                            <RatingLogo src={metaLogo}/>
                        </Rating>
                        <Rating>
                            {getAverageRating()} /10
                            <i style={{color:"var(--main-color)"}} className="fa-solid fa-star" />
                        </Rating>
                    </Ratings>

                    {movieData.trailer && 
                        <SectionContainer>
                            <Title text="Trailer"/>
                            <Trailer title={movieData.title} thumbnail={movieData.image} trailer={movieData.trailer}/>
                        </SectionContainer>
                    }
                    <SectionContainer>
                        <Title text="You may also like"/>
                        <SimilarMovies movie_id={movieData.id}/>
                    </SectionContainer>
                    <SectionContainer>
                        <Title text="Comments"/>
                        <CommentSection movie_id={movieData.id} />
                    </SectionContainer>
                </Content>
            </ContentContainer>
        </Container> 
    )
}

export default Movie;