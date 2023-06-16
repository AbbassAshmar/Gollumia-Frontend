import React, { useState,useEffect } from "react";
import {useParams } from "react-router-dom";
import MoviesNav from "../../components/MainNavbar/movies-navbar";
import styles from "./movie.module.css"
import styled from "styled-components";
import imdb from "../../photos/imdb.png";
import meta from "../../photos/meta.png";
import Comment from '../../components/CommentSectionComponents/comments-wrapper'
import SimilarMovies from '../../components/SimilarMovies/similar-movies'
import Ratings from "./Ratings/ratings";
import MovieButtons from "./MovieButtons/movie-buttons";
import DetailsBlock from "./DetailsBlock/details-block";
import MoviePageFooter from "./MoviePageFooter/movie-page-footer";
import Trailer from "./Trailer/trailer";
import { WatchNow } from "./MovieButtons/movie-buttons";
import GenresContainer from "./GenresContainer/genres-container";
const Cont  = styled.div`
    min-height:100%;
    overflow:hidden;
    background:black;
`

const FirstPageContainer = styled.div`
    height: 91.05vh;
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
@media screen and (max-width:800px){
    display:block;
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
const SecondPageContainer =styled.div`
    width:100%;
    background:black;
    min-height:100%;
`
const GenresContainer2 = styled(GenresContainer)`
@media screen and (max-width:445px){
    display:block;
}
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
        <Cont>
            <MoviesNav />
            <FirstPageContainer background={movieData.image?movieData.image:movieData.poster}>
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
                        <img className={styles.MoviePoster} alt={movieData.title} src={movieData.poster}></img>
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
                            <DetailsBlock text={"Director"} data={movieData.director} />
                            <DetailsBlock text={"Rated"} data={movieData.contentRate} />
                            <GenresContainer genres={movieData.genre} classes={`${styles.detailedText} ${styles.GenreContainer}`}/>

                            <div className={`${styles.detailedText} ${styles.RatingsContainer}`}>
                                <Ratings icon={imdb} rating={movieData['ratings']? movieData["ratings"]['imdb']:null} />
                                <Ratings icon={meta} rating={movieData['ratings']? movieData["ratings"]['metacritics']:null} />
                            </div>
                        </div>
                    </div>
                </div>
            </FirstPageContainer>
            <PlotContainer style={{width:"100%",background:"black"}}>
                <div style={{width:"95%",margin:"auto",color:"white",background:"black"}}>
                    <p style={{margin:"0 0 2rem 0"}}>Plot Summary</p>
                    <p>{movieData.plot}</p>
                </div>
            </PlotContainer>
            <SecondPageContainer>
                <Trailer thumbnail={movieData.thumbnail} url={movieData.trailer}/>
                <div className={styles.secondPageCont}>
                    <div className={styles.similarContainer}>
                        <h3 className={styles.sectionTitle}>You may also like</h3>
                        <SimilarMovies movie_id={movieData.id}/>
                    </div>
                    <div style={{width:'100%',minHeight:"100%"}}>
                        <h3 className={styles.sectionTitle}>Comments</h3>
                        <Comment page_id={movieData.id} />
                    </div>
                </div>
            </SecondPageContainer>
            <MoviePageFooter />
        </Cont>
    )
}

export default Movie;