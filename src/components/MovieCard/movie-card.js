import {Link} from 'react-router-dom';
import {motion, useScroll, useTransform} from "framer-motion";
import React, { useEffect, useRef } from "react";
import styled, {keyframes} from 'styled-components';

const OnHoverContent = styled.div`
top:50%;
left:50%;
opacity:0;
width:100%;
gap: 1rem;
z-index:12;
display: flex;
position: absolute;
align-items: center;
flex-direction: column;
transition:opacity .3s;
transform: translate(-50%,-50%);
`
const PosterContainer = styled.div`
width: 100%;
aspect-ratio: 1/1.5;
border-radius: 8px;
overflow: hidden;
min-width:0;
position: relative;
&:before{
    content:"";
    height:100%;
    width:100%;
    top:0;
    left:0;
    opacity:0;
    position: absolute;
    background-color:black;
    transition:opacity .3s;
    z-index:  10;
}
`
const Container = styled(Link)`
gap:.5rem;
width: 100%;
height:100%;
min-width:0;
display: flex;
flex-direction: column;
align-items: flex-start;
text-decoration: none;
&:hover p{
    color:orange;
}
&:hover ${PosterContainer}::before{
    opacity:.3;
}
&:hover ${OnHoverContent}{
    opacity:1;
}
`
const Poster = styled.img`
width:100%;
height:100%;
object-fit: cover;
border-radius: 8px;
will-change: transform;
`
const Play = styled.i`
font-size:3.5rem;
color:orange;
`
const Title = styled.p`
margin:0;
width:90%;
color:white;
font-size:1rem;
font-weight:600;
overflow: hidden;
white-space: nowrap;
text-overflow:ellipsis;
`

export default function MovieCard({movie={}, isLoading=false, posterOnly=false, imageStyle={}}){
    if (isLoading) 
    return(
        <LoadingMovieCard />
    )

    return(
        <Container to={`/movies/${movie.id}`}>
            <PosterContainer>
                <Poster as={motion.img} style={imageStyle} src={movie.poster}/>
                <OnHoverContent>
                    {posterOnly && <Title style={{textAlign:"center"}}>{movie.title}</Title>}
                    <Play className="fa-regular fa-circle-play"/>
                </OnHoverContent>
            </PosterContainer>
            {!posterOnly && <Title>{movie.title}</Title>}
        </Container>
    );
}



const pulseAnimation = keyframes`
0% {opacity: 0.5;}
100% { opacity: 1;}
`
const LoadingContainer = styled(Container)`
color: #fff; 
background-color: #333;
aspect-ratio: 1/1.5;
`
const LoadingAnimation = styled.div`
width: 100%;
height: 100%; 
border-radius: 8px;
background-color: var(--main-color); 
animation: ${pulseAnimation} 1s infinite alternate;
`

function LoadingMovieCard(){

    return (
        <LoadingContainer>
            <LoadingAnimation/>
        </LoadingContainer>
    )
}
