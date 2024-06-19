import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import useWindowDimensions from "../../../hooks/use-window-dimensions";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import LoadingCircle from "../../LoadingCircle/loading-circle";

const Container = styled.div`
flex:1;
gap:2rem;
display: flex;
flex-direction: column;
height:100%;
`

const MoviePoster = styled.img`
border-radius: 6px;
width:100%;
height:100%;
object-fit: contain;
`

export default function Recommendations({scrollPosition, commentsRepliesContainerRef}){
    const [recommendations, setRecommendations] = useState([]);
    const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);

    const containerRef = useRef();
    const [currentPage, setCurrentPage] = useState(1);

    const [cookies,setCookies] = useCookies()
    const {height:windowHeight} = useWindowDimensions();

    useEffect(()=>{
        const bottomOfContainerOffset = containerRef.current.getBoundingClientRect().bottom - windowHeight
        const bottomOfCommentsOffset = commentsRepliesContainerRef.current.getBoundingClientRect().bottom - windowHeight
        
        if (bottomOfContainerOffset <= 100 && !isLoadingRecommendations){
            // the comments container should have loaded before loading recommendations
            if (bottomOfContainerOffset < bottomOfCommentsOffset - 200)
            setCurrentPage((prev) => prev + 1)
        }
    },[scrollPosition, commentsRepliesContainerRef])

    useEffect(()=>{
        setIsLoadingRecommendations(true);
    },[currentPage])

    useEffect(()=>{
        if (isLoadingRecommendations)
        fetchRecommendations(currentPage)
    },[isLoadingRecommendations])

    async function fetchRecommendations(page){
        const URL = `${process.env.REACT_APP_API_URL}/api/movies/recommendations/?page=${page}&limit=3`;
        const INIT = {headers : {'Authorization' : "Token " + cookies.token}}

        const request = await fetch(URL, INIT);
        const response = await request.json();

        if (request.status == 200){
            setRecommendations((prev) => [...prev,...response.data.movies]);
        }

        setIsLoadingRecommendations(false);
    }
   

    return (
        <Container ref={containerRef}>
            {recommendations.map((movie)=>(
                <Link to={`/movies/${movie.id}`} key={movie.id}>
                    <MoviePoster src={movie.poster} alt={`movie-${movie.name}-poster`} />
                </Link>
            ))}
            {isLoadingRecommendations &&(
                <div style={{width:'100%', display:'flex', justifyContent:"center"}}>
                    <LoadingCircle />
                </div>
            )}
        </Container>
    )
}