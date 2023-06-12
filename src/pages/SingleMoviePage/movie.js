import React, { useState,useEffect } from "react";
import {useParams } from "react-router-dom";
import MoviesNav from "../../components/MainNavbar/movies-navbar";
import styles from "./movie.module.css"
import styled from "styled-components";
import imdb from "../../photos/imdb.png";
import meta from "../../photos/meta.png";
import Comment from '../../components/CommentSectionComponents/comments-wrapper'
import App from '../../components/Footer/footer'
import SimilarMovies from '../../components/SimilarMovies/similar'
import ReactPlayer from "react-player"
import  FavouriteButton  from "./FavouriteButton/favourite-button";
import GenresList from "./GenresList/genres-list";

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
            console.log(movie_data)
            console.log(movie_data['genre'])
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
                            <p>{movieData.year} . {movieData.duration} min</p>
                        </div>
                        
                        <div className={styles.btnsContainer}>
                            <button className={styles.whatchNowBtn}>Watch now</button>
                            <FavouriteButton movieId={id}/>
                            <button className={`${styles.trailerBtn} ${styles.exBtns}`} >Trailer</button>
                            <button className={`${styles.shareBtn} ${styles.exBtns}`} ><i className="fa-solid fa-share"></i></button>
                        </div>
                        <div className={styles.plotContainer}>
                            <p>{movieData.plot}</p>
                        </div>
                        <div>
                            <div className={styles.detailedText}>
                                <p className={styles.detailedTextFp}>Director  </p>
                                <p>{movieData.director}</p>
                            </div>
                            <div className={styles.detailedText}>
                                <p className={styles.detailedTextFp}>Rated  </p>
                                <p>{movieData.contentRate ? movieData.contentRate:"N/A"}</p>
                            </div>
                            <div className={styles.detailedText}>
                                <p className={styles.detailedTextFp}>Genres  </p>
                                <GenresList genres={movieData.genre} />
                            </div>
                            <div className={styles.detailedText}>
                                <div className={styles.ratingsDiv}>
                                    <img className={styles.imdbIcon} src={imdb}/>
                                    <span>{movieData['ratings'] && movieData['ratings']['imdb']? movieData['ratings']['imdb'] : "N/A"}</span>
                                </div>
                                <div className={styles.ratingsDiv}>
                                    <img className={styles.imdbIcon} src={meta}/>
                                    <span>{movieData['ratings'] && movieData['ratings']['metacritics'] ?movieData['ratings']['metacritics'] : "N/A"}</span>
                                </div>
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
            <div style={{backgroundColor:"black"}}>
                <div style={{height:"3.5rem",width:"100%"}}></div>
                <div className="emptyline"></div>
                <div style={{height:"1rem",width:"100%"}}></div>
                <App />
            </div>
        </Cont>
    )
}

export default Movie;