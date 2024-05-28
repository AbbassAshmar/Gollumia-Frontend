import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
right:0;
width: 100%;
z-index: 100;
display: flex;
border-radius: 8px;
position:absolute;
flex-direction:column;
top:calc(100% + .5rem);
background-color: rgba(69,69,69,1);
overflow: hidden;
`
const MovieTitle = styled.p`
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
color:white;
font-weight: 500;
margin:0;
font-size: 14px;
`
const SearchedMovie = styled(Link)`
width: 100%;
gap: 0.75rem;
display: flex;
padding: .5rem .75rem;
align-items: flex-start;
text-decoration: none;
&:hover{
    background:rgba(80,80,80,1);
}
&:hover ${MovieTitle}{
    color:orange;
}
`

const MoviePosterContainer = styled.div`
aspect-ratio: 1/1.2;
min-width:60px;
flex:.4;
border-radius: 4px;
`
const MoviePoster = styled.img`
width:100%;
height:100%;
object-fit: cover;
border-radius: 4px;
`
const MovieTextContainer = styled.div`
flex:4;
gap:.25rem;
display: flex;
flex-direction: column;
justify-content: flex-start;
`
const MovieYear = styled.p`
font-weight: 600;
color:grey;
margin:0;
font-size: 12px;
`

const ViewAllResultsButton = styled.button`
gap:.5rem;
border: none;
display: flex;
justify-content: center;
align-items: center;
padding: .5rem .75rem;
font-weight: 600;
font-size: 1rem;
margin-top: .5rem;
background-color: orange;
&:hover{
    background-color:darkorange;
}
`
export default function SearchResultsList({searchResults,searchResultsListRef}){
    return(
        <>
            {searchResults?.length > 0 && (
                <Container ref={searchResultsListRef}>
                    {searchResults.map(movie=>(
                        <SearchedMovie to={`/movies/${movie.id}`} key={movie.id}>
                            <MoviePosterContainer>
                                <MoviePoster src={movie.poster} alt={movie.title + " poster"}/>
                            </MoviePosterContainer>
                            <MovieTextContainer>
                                <MovieTitle>{movie.title}</MovieTitle>
                                <MovieYear>{(new Date(movie.released).getFullYear())}</MovieYear>
                            </MovieTextContainer>
                        </SearchedMovie>
                    ))}
                    <ViewAllResultsButton type="submit">
                        <span>View all Results</span>
                        <i style={{fontSize:".8rem",marginTop:"3px"}} className="fa-solid fa-chevron-right"/>
                    </ViewAllResultsButton>
                </Container>
            )}
        </>
    )
}