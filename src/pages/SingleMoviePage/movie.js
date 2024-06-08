import React, { useState,useEffect } from "react";
import {useParams } from "react-router-dom";
import styled from "styled-components";
import SimilarMovies from '../../components/SimilarMovies/similar-movies'
import Trailer from "./Trailer/trailer";
import CommentSection from "../../components/CommentSection/comment-section";
import AboveTheFolds from "./sections/above-the-folds";

const Container  = styled.div`
min-height:100%;
overflow:hidden;
background:black;
`

const ContentContainer = styled.div`

`

const Content =styled.div`
width:100%;
padding: 0 2rem;
background:black;
min-height:100%;
gap: 4rem;
display: flex;
flex-direction: column;
`
const SectionTitle= styled.h3`
font-size: 2rem;
color:white;
font-weight:100;
display: inline-block;
border-bottom: 2px solid transparent;
padding-bottom: .5rem ;
border-image: linear-gradient(to right, rgba(249, 105, 14,1),rgba(0,0,0,0)) 0 0 100% 0;
`
const SectionContainer  = styled.div`
gap:2rem;
display: flex;
flex-direction: column;
align-items: flex-start;
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
    
    return(
        <Container>
            <ContentContainer>
                <AboveTheFolds movie={movieData} />
                <Content>
                    <SectionContainer>
                        <SectionTitle>Trailer</SectionTitle>
                        <Trailer title={movieData.title} thumbnail={movieData.image} trailer={movieData.trailer}/>
                    </SectionContainer>
                    <SectionContainer>
                        <SectionTitle>You may also like</SectionTitle>
                        <SimilarMovies movie_id={movieData.id}/>
                    </SectionContainer>
                    <SectionContainer>
                        <SectionTitle>Comments</SectionTitle>
                        <CommentSection movie_id={movieData.id} />
                    </SectionContainer>
                </Content>

            </ContentContainer>
        </Container> 
    )
}

export default Movie;