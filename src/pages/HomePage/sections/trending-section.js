import { useEffect, useState } from "react";
import styled from "styled-components";
import MovieCard from "../components/movie-card";
import Up from "../../../photos/Up.jpg";

const Container = styled.div`
width:100%;
`
const ContentContainer = styled.div`
gap:3rem;
width:100%;
padding:0 2rem;
display: flex;
align-items: flex-start;
justify-content: space-between;
@media screen and (max-width:768px){
    padding:1rem;
    flex-direction: column;
}
`
const Content = styled.div`
width:40%;
gap:2rem;
display: flex;
margin-top: 7%;
flex-direction: column;
align-items: flex-start;
@media screen and (max-width:768px){
    width:100%;
}
`
const TextContainer = styled.div`
gap:1rem;
display: flex;
flex-direction: column;
align-items: flex-start;
`
const Title = styled.h3`
color:white;
font-size: var(--heading-3);
`
const Subtitle = styled.h5`
color:var(--main-color);
font-size: var(--heading-5);
`
const ViewTrendingButton = styled.button`
color:white;
padding:.5rem 1rem;
border-radius: 300px;
font-size: var(--body);
background-color: var(--main-color);
`
const MovieCardsContainer = styled.div`
width:40%;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: center;
@media screen and (max-width:768px){
    width:100%;
}
`
const MovieCardsRow = styled.div`
gap:2rem;
width:100%;
display: flex;
align-items: center;
justify-content: center;
`
const MovieCardContainer = styled.div`
width:50%;
`

const BigImageContainer = styled.div`
width:100%;
`
const BigImage = styled.img`
width:100%;
height:100%;
object-fit: cover;
`

const title = "May the Force be with you.";
const subtitle = "See What's Hot Now Your Next Adventure Awaits.";

export default function TrendingSection(){
    const [trendingMovies, setTrendingMovies] = useState([])

    useEffect(()=>{
        const URL = `${process.env.REACT_APP_API_URL}/api/movies/trending?limit=3`;
        fetchTrendingMovies(URL);
    },[])

    async function fetchTrendingMovies(url){
        const request = await fetch(url);
        if (request.status == 200){
            const moviesList = await request.json()
            setTrendingMovies(moviesList.data.movies)
        }
    }

    return(
        <Container>
            <ContentContainer>
                <Content> 
                    <TextContainer>
                        <Subtitle>{title}</Subtitle>
                        <Title>{subtitle}</Title>
                    </TextContainer>
                    <ViewTrendingButton>View Trending</ViewTrendingButton>
                </Content>
                <MovieCardsContainer>
                    <MovieCardsRow>
                        <MovieCardContainer style={{transform:'translate(0,20%)'}}>
                            <MovieCard movie={null}/>
                        </MovieCardContainer>
                        <MovieCardContainer>
                            <MovieCard movie={null}/>
                        </MovieCardContainer>
                    </MovieCardsRow>
                    <MovieCardsRow style={{margin:"-15% 0"}}>
                        <MovieCardContainer style={{transform:'translate(20%,-30%)'}}>
                            <MovieCard movie={null}/>
                        </MovieCardContainer>
                    </MovieCardsRow>
                </MovieCardsContainer>
            </ContentContainer>
            <BigImageContainer>
                <BigImage src={Up}/>
            </BigImageContainer>
        </Container>
    )
}