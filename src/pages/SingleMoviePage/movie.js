import React, { useState,useEffect } from "react";
import {useParams } from "react-router-dom";
import MoviesNav from "../../components/MainNavbar/movies-navbar";
import styles from "./movie.module.css"
import styled from "styled-components";
import imdb from "../../photos/imdb.png";
import meta from "../../photos/meta.png";
import Comment from '../../components/CommentSectionComponents/comments-wrapper'
import SimilarMovies from '../../components/SimilarMovies/similar-movies'
import ReactPlayer from "react-player"
import GenresList from "./GenresList/genres-list";
import Ratings from "./Ratings/ratings";
import MovieButtons from "./MovieButtons/movie-buttons";
import DetailsBlock from "./DetailsBlock/details-block";
import MoviePageFooter from "./MoviePageFooter/movie-page-footer";

const Cont  = styled.div`
    min-height:100%;
    display:"flex";
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
const SecondPageContainer =styled.div`
    width:100%;
    background:black;
    min-height:100%;
`
function Movie(){
    const {id} = useParams();
    const [movieData, setMovieData ] = useState({})

    async function fetchMovieData (id){
        console.log("here")
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
                    <img className={styles.MoviePoster} alt={movieData.title} src={movieData.poster}></img>
                    <div className={styles.textContainer}>
                        <div>
                            <h1 className={styles.movieTitle}>{movieData.title}</h1>
                            <p>{movieData.released} . {movieData.duration} min</p>
                        </div>

                        <MovieButtons id={id} />

                        <div className={styles.plotContainer}>
                            <p>{movieData.plot}</p>
                        </div>

                        <div>
                            <DetailsBlock text={"Director"} data={movieData.director} />
                            <DetailsBlock text={"Rated"} data={movieData.contentRate} />

                            <div className={styles.detailedText}>
                                <p className={styles.detailedTextFp}>Genres  </p>
                                <GenresList genres={movieData.genre} />
                            </div>

                            <div className={styles.detailedText}>
                                <Ratings icon={imdb} rating={movieData['ratings']? movieData["ratings"]['imdb']:null} />
                                <Ratings icon={meta} rating={movieData['ratings']? movieData["ratings"]['metacritics']:null} />
                            </div>
                        </div>
                    </div>
                </div>
            </FirstPageContainer>
            <SecondPageContainer>
                <div className={styles.secondPageCont}>
                    <div className={styles.trailerContainer}>
                        <h3 className={styles.sectionTitle}>Tailer</h3>
                        <div className={styles.movieTrailerContainer} >
                            {/* <iframe className={styles.movieTrailer} src={state.trailer} title="Rick and Morty Season 4 - Official Trailer" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
                            <ReactPlayer style={{margin:"auto"}} url={movieData.trailer} light={movieData.thumbnail? movieData.thumbnail:true}/>
                        </div>
                    </div>
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