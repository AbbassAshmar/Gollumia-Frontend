import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import useFavorites from "../../../hooks/use-favorites";
import { useEffect } from "react";
import { useState } from "react";

const Container = styled.div`
z-index: 2;
width: 100%;
display: flex;
padding: 2rem;
padding-top:4rem;
overflow:hidden;
position: relative;
align-items: center;
height: min(100vh, 1000px);
justify-content: flex-start; 
&::before{
    content:"";
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:-1;
    background:radial-gradient(circle, rgba(0,0,0,.4) 50%, rgba(0,0,0,.8) 100%);
}
@media screen and (max-width:800px){
    height:auto;
    padding: 4rem 1rem 2rem 1rem;
}
`
const BackgroundImageContainer = styled.div`
width:100%;
height:100%;
position: absolute;
top:0;
left:0;
z-index:-2;
background-color: transparent;
`
const BackgroundImage = styled.img`
width:100%;
height:100%;
object-fit:cover;
`
const Content = styled.div`
gap:2rem;
width:100%;
display:flex;
align-items: center;
position: relative;
z-index: 1;
@media screen and (max-width:800px){
    flex-direction: column;
    align-items: flex-start;
}
`
const PosterContainer = styled.div`
flex:1.25;
min-width:250px;
border-radius:8px;
aspect-ratio: 1/1.4;
overflow: hidden;
@media screen and (max-width:800px){
    width:100%;
}
`
const Poster = styled.img`
width: 100%;
height:100%;
object-fit: cover;
border-radius: 8px;
`
const InformationContainer = styled.div`
flex:4;
gap:2rem;
display: flex;
flex-direction: column;
`
const GenresTitleContainer = styled.div`

`
const GenresContainer = styled.div`
gap:.5rem;
display: flex;
align-items: center;
`
const Genre = styled(Link)`
margin:0;
padding:0;
color:var(--main-color);
&:hover{
    color:var(--main-color-dark);
}
`
const TitleContainer = styled.h1`
padding:0;
margin:0;
color:white;
font-weight:bold;
letter-spacing: -0.05em;
font-size: var(--heading-1);
line-height: var(--heading-1);
`

const PlotContainer = styled.p`
margin:0;
padding:0;
color:white;
font-size:var(--body);
letter-spacing: 0.02em;
line-height: 22.4px;
`
const ButtonDetailsContainer = styled.div`
gap:2rem;
display:flex;
align-items: center;
@media screen and (max-width:1024px){
    gap:1rem;
    flex-direction: column;
    align-items: flex-start;
}
`
const ButtonsContainer = styled.div`
gap:1rem;
display: flex;
align-items: center;
`
const FavoriteButton = styled.button`
width: 40px;
height: 40px;
display: flex;
border-radius: 50%;
align-items: center;
color:var(--main-color);
justify-content: center;
border:2px solid var(--main-color);
transition:border .3s, color .3s;
&:hover{
    color:var(--main-color-dark);
    border:2px solid var(--main-color-dark);
}
`
const TrailerButton = styled.button`
gap: 0.5rem;
border:none;
color:white;
outline:none;
display: flex;
font-weight:bold;
align-items: center;
background-color: none;
color:var(--main-color);
font-size: var(--small-1);
&:hover{
    color:var(--main-color-dark);
}
`
const PlayTrailer = styled.div`
width: 40px;
height: 40px;
display: flex;
border-radius: 50%;
align-items: center;
color:var(--main-color);
justify-content: center;
border:2px solid var(--main-color);
transition:border .3s, color .3s;

${TrailerButton}:hover &{
    color:var(--main-color-dark);
    border:2px solid var(--main-color-dark);
}
`
const Line = styled.div`
width:2px;
height:32px;
background:white;
border-radius: 8px;
opacity: .5;
@media screen and (max-width:1024px){
    display:none;
}
`
const Details = styled.div`
gap:1rem;
color:#D0D0D0;
display: flex;
font-weight:500;
font-size:var(--small-1);
@media screen and (max-width:1024px){
    flex-wrap:wrap;
}
`
const DetailText = styled.p`
margin:0;
padding:0;
font-weight: inherit;
`

export default function AboveTheFolds({movie, trailerSectionRef}){
    const {addOrRemoveFavorite, isFavorite} = useFavorites(movie);

    const containerRef = useRef();
    const {scrollYProgress} =  useScroll({
        target: containerRef,
        offset: ['0' , 'end start']
    })
    
    const imageYContainer =useTransform(scrollYProgress, [0,1], ['0%', '-10%']);
    const imageY = useTransform(scrollYProgress,[0,1], ['0%', '28%']);

    function heartIconSolidOrRegular(){
        if (isFavorite) return 'solid';
        return 'regular'
    }

    function handleFavoriteButtonCLick(){
        addOrRemoveFavorite();
    }

    function handleTrailerButtonClick(){
        trailerSectionRef?.current?.scrollIntoView({ behaviour: "smooth" });
    }

    return(
        <Container $background={movie.image}>
            <BackgroundImageContainer as={motion.div} ref={containerRef} style={{y:imageYContainer}}>
                <BackgroundImage src={movie.image} as={motion.img}  style={{y:imageY}} />
            </BackgroundImageContainer>
            <Content>
                <PosterContainer>
                    <Poster src={movie.poster} />
                </PosterContainer>
                <InformationContainer>
                    <GenresTitleContainer>
                        {movie.genres?.length>0 && (
                            <GenresContainer>
                                {movie.genres.map((genre,index)=>(
                                    <div key={genre.id} style={{display:"flex",gap:".5rem"}}>
                                        <Genre to={`/movies?genre=${genre.name}`}>{genre.name}</Genre>
                                        {index !== movie.genres.length - 1 && <span style={{cursor:"default", color:"var(--main-color)"}}>.</span>}
                                    </div>
                                ))}
                            </GenresContainer>
                        )}
                        <TitleContainer>
                            {movie.title}
                        </TitleContainer>
                    </GenresTitleContainer>
                    <PlotContainer>
                        {movie.plot}
                    </PlotContainer>
                    <ButtonDetailsContainer>
                        <ButtonsContainer>
                            <FavoriteButton onClick={handleFavoriteButtonCLick}>
                                <i style={{color:"inherit"}} className={`fa-${heartIconSolidOrRegular()} fa-heart`}/>
                            </FavoriteButton>
                            <TrailerButton onClick={handleTrailerButtonClick}>
                                <PlayTrailer>
                                    <i style={{color:"inherit"}} className="fa-solid fa-play"/>
                                </PlayTrailer>
                                watch trailer
                            </TrailerButton>
                        </ButtonsContainer>
                        <Line />
                        <Details>
                            <DetailText>{movie.duration}</DetailText>
                            <span style={{cursor:"default"}}>.</span>
                            <DetailText>{movie?.director?.name || "N/A"}</DetailText>
                            <span style={{cursor:"default"}}>.</span>
                            <DetailText>{movie.released}</DetailText>
                        </Details>
                    </ButtonDetailsContainer>
                </InformationContainer>
            </Content>
        </Container>
    )
}