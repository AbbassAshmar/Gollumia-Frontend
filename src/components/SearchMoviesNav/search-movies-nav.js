import styled from "styled-components";
import Movie from "./movie-box";


const SearchedMoviesContainer = styled.div`
    position:absolute;
    width:15rem;
    min-height:12vh;
    background:rgb(56, 59, 57);
    right:10%;
    top:100%;
    z-index:5;
`
const SearchedMovies = styled.div`
    width:100%;
    height:100%;

    display:flex;
    flex-direction:column;
`


function SearchMoviesNav(props){
    return(
        <>
        {props.inputLength > 0 && props.movies && props.movies.length >= 1 ?
            <SearchedMoviesContainer>
            <SearchedMovies>
                    {props.movies.map((movie)=>{
                        return  <Movie 
                                    id = {movie.id}
                                    key = {movie.id}
                                    duration={movie.duration}
                                    title={movie.title} 
                                    imdb={movie.ratings.imdb}
                                    poster={movie.poster} 
                                    released={movie.released != "N/A"?movie.released.split('-')[0]:"N/A"}
                                />
                    })}
            </SearchedMovies>
        </SearchedMoviesContainer>:
        null}
        </>
    )

}

export default SearchMoviesNav;