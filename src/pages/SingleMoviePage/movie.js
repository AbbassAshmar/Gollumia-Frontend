import React, { useState,useEffect } from "react";
import {useParams } from "react-router-dom";
import MoviesNav from "../../components/MainNavbar/movies-navbar";
import styles from "./movie.module.css"
import styled from "styled-components";
import imdb from "../../photos/imdb.png";
import meta from "../../photos/meta.png";
import SimilarMovies from '../../components/SimilarMovies/similar-movies'
import Ratings from "./Ratings/ratings";
import MovieButtons from "./MovieButtons/movie-buttons";
import DetailsBlock from "./DetailsBlock/details-block";
import MoviePageFooter from "./MoviePageFooter/movie-page-footer";
import Trailer from "./Trailer/trailer";
import { WatchNow } from "./MovieButtons/movie-buttons";
import GenresContainer from "./GenresContainer/genres-container";
import CommentSection from "../../components/CommentSection/comment-section";

const Container  = styled.div`
min-height:100%;
overflow:hidden;
background:black;
`

const ContentContainer = styled.div`

`

const AboveTheFolds = styled.div`
min-height:75vh;
width: 100%;
position: relative;
z-index: 0;
overflow:hidden;
&:before{
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    background:url(${({background})=>background});
    background-size:cover;
    filter:blur(2px);
    transform: scale(1.1);
}
@media screen and (max-width:577px){
    min-height:55vh;
}
`
const FirstChild = styled.div`
&:before{
content: "";
width: 100%;
height: 100%;
position: absolute;
z-index: -1;
color:white;
background:linear-gradient(to top,rgba(0,0,0,0.9) ,rgba(0,0,0,0.5));
border-bottom:10px solid black;
}
`
const PlotContainer = styled.div`
display:none;
margin:0 0 1rem 0;

@media screen and (max-width:800px){
display:block;
}
@media screen and (max-width:577px){
margin:1rem 0;
}
`
const ImgBtnContainer = styled.div`
display:flex;
flex-direction:column;
@media screen and (max-width:445px){
width:50%;
}
`
const WatchNowButton = styled(WatchNow)`
display:none;

@media screen and (max-width:577px){
display:block;
}
@media screen and (max-width:445px){
width:100%;
}
`
const Released = styled.p`
@media screen and (max-width:445px){
display:none;
}
`
const Content =styled.div`
width:100%;
padding: 0 2rem;
background:black;
min-height:100%;
gap: 2rem;
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
        const request = await fetch(`http://127.0.0.1:8000/api/movies/${id}/`);
        const movie_data = await request.json();
        if (request.status == 200){
            setMovieData(movie_data)
        }
    }

    useEffect(()=>{
        fetchMovieData(id)
    },[])
    
    return(
        <Container>
            <MoviesNav />
            <ContentContainer>
                <AboveTheFolds background={movieData.image?movieData.image:movieData.poster}>
                    <FirstChild></FirstChild>
                    <div className={styles.infoContainer}>
                        <ImgBtnContainer>
                            <h1 className={styles.movieTitle2}>
                                {movieData.title} 
                                <span style={{fontSize:".9rem"}}>  
                                    ({movieData && movieData.released?movieData.released.split('-')[0]:"N/A"})
                                </span>
                            </h1>
                            <GenresContainer classes={`${styles.GenreContainer2} ${styles.detailedText}`} genres={movieData.genre}/>
                            <img className={styles.MoviePoster} alt={movieData.title} src={movieData.poster}/>
                            <WatchNowButton >Watch now</WatchNowButton>
                        </ImgBtnContainer>
                        <div className={styles.textContainer}>
                            <div>
                                <h1  className={styles.movieTitle}>{movieData.title}</h1>
                                <Released style={{marginTop:".8rem",}}>{movieData.released} . {movieData.duration} min</Released>
                            </div>
                            <MovieButtons id={id} />
                            <div className={styles.plotContainer}>
                                <p>{movieData.plot}</p>
                            </div>
                            <div>
                                <DetailsBlock text={"Director"} data={movieData.director?.name || "N/A"} />
                                <DetailsBlock text={"Rated"} data={movieData.contentRate} />
                                <GenresContainer genres={movieData.genre} classes={`${styles.detailedText} ${styles.GenreContainer}`}/>
                                <div className={`${styles.detailedText} ${styles.RatingsContainer}`}>
                                    <Ratings icon={imdb} rating={movieData['ratings']? movieData["ratings"]['imdb']:"N/A"} />
                                    <Ratings icon={meta} rating={movieData['ratings']? movieData["ratings"]['metacritics']:"N/A"} />
                                </div>
                            </div>
                        </div>
                    </div>
                </AboveTheFolds>
                <Content>
                    <SectionContainer>
                        <SectionTitle>Trailer</SectionTitle>
                        <Trailer thumbnail={movieData.thumbnail} url={movieData.trailer}/>
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
            <MoviePageFooter />
        </Container> 
    )
}

export default Movie;