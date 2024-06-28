import styled from "styled-components";
import horror from "../../../photos/horror.jpg";
import adventure from "../../../photos/adventure.jpg";
import action from "../../../photos/action.jpg";
import GenreBox from "../components/genre-box";
import MovieCard from "../../../components/MovieCard/movie-card";
import { useState } from "react";
import { useEffect } from "react";

const Container = styled.section`
gap:4rem;
width: 100%;
padding:2rem;
display: flex;
overflow-x: clip;
align-items: stretch;
background-color:black;
justify-content: flex-start;

@media screen and (max-width:800px) {    
    align-items: center;
    flex-direction: column;
}

@media screen and (max-width:800px) {
    padding:1rem;
}
`
const PostersContainer = styled.div`
flex:1;
z-index:1;
display:flex;
position: relative;
flex-direction: column;
@media screen and (max-width:800px){
    display: none;
}
`
const PosterContainer = styled.div`
flex:1;
clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
`
const MovieCardWrapper = styled.div`
top:0;
left:0;
width:100%;
height:100%;
position: absolute;
`
const MovieCardContainer = styled.div`
top:1rem;
position:sticky;
`
const GenresContainer = styled.div`
flex:4;
display: flex;
position:relative;
flex-direction: column;
@media screen and (max-width:1024px){
    gap:3rem;
}
@media screen and (max-width:728px){
    gap:2rem;
}
`

const GENRES = [{id:1, name:"Horror", image:horror, colors:['#E6E3DD','#E6E3DD']},{id:2, name:"Action", image:action, colors:['#B04206','#FFB03A']},{id:3, name:"Adventure", image:adventure, colors:['#35A7D9','#5DB4CF']}]

export default function GenresSection(){
    const [movies, setMovies] = useState({horror : null, adventure: null, action:null})
    const [isLoading , setIsLoading] = useState(true);

    useEffect(()=>{
        fetchHorrorActionAdventureMovies();
    },[])

    async function fetchHorrorActionAdventureMovies(){
        try{
            const [horrorMovie, adventureMovie, actionMovie] = await Promise.all([
                fetchMovieByGenre("Horror"),
                fetchMovieByGenre("Adventure"),
                fetchMovieByGenre("Action"),
            ])

            setMovies([
                horrorMovie,
                adventureMovie,
                actionMovie
            ])
        }catch(Error){
            setMovies([]);
        }

        setIsLoading(false);
    }

    async function fetchMovieByGenre(genre){
        const URL = `${process.env.REACT_APP_API_URL}/api/movies/?genre=${genre}&limit=1`;
        const request = await fetch(URL);
        if (request && request.status == 200){
            const response = await request.json();
            return response.data.movies[0];
        }

        return null;
    }

    return(
        <Container>
            <PostersContainer>
                <PosterContainer>
                    <MovieCardWrapper>
                        <MovieCardContainer style={{zIndex:'4'}}>
                            {isLoading && <MovieCard isLoading={true}/>}
                            {!isLoading && <MovieCard movie={movies[0]} posterOnly={true}/>}
                        </MovieCardContainer>
                    </MovieCardWrapper>
                </PosterContainer>
                <PosterContainer>
                    <MovieCardWrapper>
                        <MovieCardContainer style={{zIndex:'3'}}>
                            {isLoading && <MovieCard isLoading={true}/>}
                            {!isLoading && <MovieCard movie={movies[1]} posterOnly={true}/>}
                        </MovieCardContainer>
                    </MovieCardWrapper>
                </PosterContainer>
                <PosterContainer>
                    <MovieCardWrapper>
                        <MovieCardContainer style={{zIndex:'2'}}>
                            {isLoading && <MovieCard isLoading={true}/>}
                            {!isLoading && <MovieCard movie={movies[2]} posterOnly={true}/>}
                        </MovieCardContainer>
                    </MovieCardWrapper>
                </PosterContainer>
            </PostersContainer>
            <GenresContainer>
                {GENRES.map((genre)=>(
                    <GenreBox key={genre.id} colors={genre.colors} name={genre.name} image={genre.image} />
                ))}
            </GenresContainer>
        </Container>
    )
}