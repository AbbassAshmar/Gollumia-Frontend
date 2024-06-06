import { useEffect, useState } from "react";
import styled from "styled-components";
import Up from "../../../photos/Up.jpg";
import ParallaxMovieCard from "../components/parallax-movie-card";

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
align-items: center;
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
flex:1;
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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const URL = `${process.env.REACT_APP_API_URL}/api/movies/trending/?limit=3`;
        fetchTrendingMovies(URL);
    },[])

    async function fetchTrendingMovies(url){
        const request = await fetch(url);
        if (request.status == 200){
            const moviesList = await request.json()
            setTrendingMovies(moviesList.data.movies)
        }

        setIsLoading(false);
    }


    const renderMovieCards = (movies, isLoading, styles) => {
        return movies.map((movie, index) => (
          <MovieCardContainer key={index} style={styles[index]}>
            {!isLoading && movie ? <ParallaxMovieCard movie={movie} posterOnly={true} /> : <ParallaxMovieCard isLoading={true} />}
          </MovieCardContainer>
        ));
    };

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
                        {renderMovieCards(trendingMovies.slice(0, 2), isLoading, [{transform:'translate(0,10%)'},{}])}
                    </MovieCardsRow>
                    <MovieCardsRow style={{margin: "-20% 0%", width:'50%', transform:"translate(20%,0)"}}>
                        {renderMovieCards(trendingMovies.slice(2), isLoading, [{}])}
                    </MovieCardsRow>
                </MovieCardsContainer>
            </ContentContainer>
            <BigImageContainer>
                <BigImage src={Up}/>
            </BigImageContainer>
        </Container>
    )
}