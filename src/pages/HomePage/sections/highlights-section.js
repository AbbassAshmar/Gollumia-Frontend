import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`

`
const Header = styled.div`
gap:2rem;
display: flex;
align-items: center;
justify-content: space-between;
`
const TextContainer = styled.div`
gap:1rem;
display: flex;
flex-direction: column;
align-items: flex-start;
`
const Title = styled.h2`
color:white;
font-size:var(--heading-2);
font-weight:bold;
`
const SubTitle = styled.h5`
color:#D0D0D0;
font-size:var(--heading-5);
`
const StatusButtonsContainer = styled.div`
gap:2rem;
display: flex;
align-items: center;
`
const StatusButton = styled.div`

`
const MoviesContainer = styled.div`
gap:2rem;
display: flex;
align-items: center;
`

const TITLE = "Highlights Of The Day";
const SUBTITLES = {
    Trending : "~ with great power comes great responsibility",
    Latest : "~ i feel the need... the need for speed !",
    Upcoming : "~ to infinity and beyond !",
}

export default function HighLightsSection(){
    const [movies, setMovies] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("Latest");

    useEffect(()=>{
        const URL = `${process.env.REACT_APP_API_URL}/api/movies/${selectedStatus.toLowerCase()}/?limit=4`;
        fetchTrendingMovies(URL);
    },[selectedStatus])

    async function fetchTrendingMovies(url){
        const request = await fetch(url);
        if (request.status == 200){
            const moviesList = await request.json()
            setMovies(moviesList.data.movies)
        }
    }

    return (
        <Container>
            <Header>
                <TextContainer>
                    <Title>{TITLE}</Title>
                    <SubTitle>{SUBTITLES[selectedStatus]}</SubTitle>
                </TextContainer>
                <StatusButtonsContainer>
                    <StatusButton>Latest</StatusButton>
                    <StatusButton>Trending</StatusButton>
                    <StatusButton>Upcoming</StatusButton>
                </StatusButtonsContainer>
            </Header>
            <MoviesContainer>
                {movies?.length > 0 && movies.map((movie)=>(
                    <MovieCard movie={movie} />
                ))}
            </MoviesContainer>
        </Container>
    )
}