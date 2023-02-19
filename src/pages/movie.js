import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import MoviesNav from "../components/moviesNavbar";
import styles from "./movie.module.css"
import styled from "styled-components";
import { Button } from "reactstrap";
import imdb from "../photos/imdb.png";
import meta from "../photos/meta.png";
import Category from "../components/Category";
import MovieCard from "../components/Moviecard";
import Comment from '../components/Comments'
import App from '../components/Footer'
import SimilarMovies from '../components/Similar'
import ReactPlayer from "react-player"
import { useCookies } from "react-cookie";
function Movie(){
    const [cookies,setCookies] = useCookies('token')
    const [fav, setFav] = useState("white")
    const {state} = useLocation(); // getting movie data from the state passed from the movie link,
    // using this approach , any movie's page can't be accessed unless the movie's link is clicked.
    // another approach : get the movie's id from the url using useParams(), then send a request to the server including id;
    const {id} = useParams();
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
        background:url(${state.image?state.image:state.poster});
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
    async function favRequest(){ // request to add or remove a movie from favourites
        let data = {
            email:cookies.token[1],
            movie_id: id
        }
        const request = await fetch("http://127.0.0.1:8000/api/favourite",{
            method:"post",
            body:JSON.stringify(data),
            headers:{
                "Content-type":"application/json",
                "Authorization":"Token "+ cookies.token[0],
            }
        })
        const resp= await request.json()
        console.log(resp)
        if(request.ok ==true && request.status ==200){
            if (resp['deleted/created'] == 'created'){
                setFav('red')
            }else(setFav("white"))
        }
        return request
    }
    
    useEffect(()=>{ // check whether a movie is added to favourites or not to decide the color of the fav heart
        const fetchFav = async function(){
            const req = await fetch(`http://127.0.0.1:8000/api/favourite/${cookies.token[2]}/${id}`,{
                method:"get",
                headers:{
                    "Authorization":"Token "+cookies.token[0],
                    "Content-type":"application/json"
                }
            })
            const resp = await req.json()
            console.log(req)
            if (req.ok==true && resp.found==false){
                setFav("white")
            }
            else if(req.ok==true && resp.found == true){
                setFav("red")
            }
            return resp
        }
        fetchFav()
    },[])
    return(
        <Cont>
            <MoviesNav />
            <FirstPageContainer>
                <FirstChild></FirstChild>
                <div className={styles.infoContainer}>
                    <img className={styles.MoviePoster} alt={state.title} src={state.poster}></img>
                    <div className={styles.textContainer}>
                        <div>
                            <h1 className={styles.movieTitle}>{state.title}</h1>
                            <p>{state.year} . {state.duration} min</p>
                        </div>
                        
                        <div className={styles.btnsContainer}>
                            <button className={styles.whatchNowBtn}>Watch now</button>
                            <button className={`${styles.favBtn} ${styles.exBtns}`} ><i onClick={favRequest} style={{color:fav}} className="fa-solid fa-heart"></i></button>
                            <button className={`${styles.trailerBtn} ${styles.exBtns}`} >Trailer</button>
                            <button className={`${styles.shareBtn} ${styles.exBtns}`} ><i className="fa-solid fa-share"></i></button>
                        </div>
                        <div className={styles.plotContainer}>
                            <p>{state.plot}</p>
                        </div>
                        <div>
                            <div className={styles.detailedText}><p className={styles.detailedTextFp}>Director  </p><p>{state.director}</p></div>
                            <div className={styles.detailedText}><p className={styles.detailedTextFp}>Rated  </p><p>{state.rated.length > 0? state.rated:"N/A"}</p></div>
                            <div className={styles.detailedText}><p className={styles.detailedTextFp}>Genres  </p><p>{state.genres.map((genre)=>{return genre}).join(", ")}</p></div>
                            <div className={styles.detailedText}>
                                <div className={styles.ratingsDiv}><img className={styles.imdbIcon} src={imdb}/><span>{state.imdb ? state.imdb : "N/A"}</span></div>
                                <div className={styles.ratingsDiv}><img className={styles.imdbIcon} src={meta}/><span>{state.meta ? state.meta : "N/A"}</span></div>
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
                            <ReactPlayer style={{margin:"auto"}} url={state.trailer} light={state.thumbnail? state.thumbnail:true}/>
                        </div>
                    </div>
                    <div className={styles.similarContainer}>
                        <h3 className={styles.sectionTitle}>You may also like</h3>
                        <SimilarMovies movie_id={state.page_id}/>
                    </div>
                    <div style={{width:'100%',minHeight:"100%"}}>
                        <h3 className={styles.sectionTitle}>Comments</h3>
                        <Comment page_id={state.page_id} />
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