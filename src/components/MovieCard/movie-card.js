import {Link} from 'react-router-dom';
import {motion, useScroll, useTransform} from "framer-motion";
import React, { useEffect, useRef } from "react";
import styled, {keyframes} from 'styled-components';
import cameraSlash from "../../photos/cameraSlash.png";

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
const NoPoster = styled.div`
width:100%;
height:100%;
display: flex;
align-items: center;
justify-content: center;
border-radius: 8px;
will-change: transform;
background-color: rgba(255,255,255,0.8);
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

export default function MovieCard({movie={}, style={}, isLoading=false, posterOnly=false, imageStyle={}}){
    if (isLoading) 
    return(
        <LoadingMovieCard />
    )

    if (!movie || Object.keys(movie).length === 0)
    return(
        <NoMovieCard />
    )

    return(
        <Container style={style} to={`/movies/${movie.id}`}>
            <PosterContainer>
                {movie.poster ?
                    <Poster as={motion.img} style={imageStyle} src={movie.poster}/>:
                    <NoPoster as={motion.div} style={imageStyle} >
                        <img style={{width:'70px'}} src={cameraSlash}/>
                    </NoPoster>
                }
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
const LoadingContainer = styled.div`
width: 100%;
height:100%;
min-width:0;
color: #fff; 
border-radius: 8px;
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

export function LoadingMovieCard(){
    return (
        <LoadingContainer>
            <LoadingAnimation/>
        </LoadingContainer>
    )
}




const PlaceholderContainer = styled.div`
width: 100%;
height:100%;
min-width:0;
color: #fff; 
position: relative;
border-radius: 8px;
background-color: black;
aspect-ratio: 1/1.5;
`

const Placeholder = styled.div`
gap:.5rem;
width: 100%;
height: 100%;
color: white;
display: flex;
font-size: 2rem;
text-align: center;
position: relative;
border-radius: 8px;
align-items: center;
flex-direction: column;
justify-content: center;
background-color: rgba(255, 255, 255, 0.19); 
`

export function NoMovieCard(){
    return (
        <PlaceholderContainer>
            <Placeholder>
                <p style={{fontSize:"18px"}}>Oops !</p>
                <p style={{fontSize:'14px',marginBottom:".5rem"}}>movie not available</p>
                <i className="fa-solid fa-heart-crack"/>
            </Placeholder>
        </PlaceholderContainer>
    )
}