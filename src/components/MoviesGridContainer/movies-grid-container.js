import MovieCard from "../MovieCard/movie-card";
import styled from "styled-components";

const Container = styled.div`
    display: grid;
    grid-template-columns:repeat(auto-fit ,minmax(200px,1fr));
    overflow:visible;
    justify-items: center;
    gap:10px;
    width:100%;
    padding:1%;
    background:black; 
    @media screen and (max-width:802px){
        grid-template-columns:repeat(3,1fr);
    }
    @media screen and (max-width:638px){
        grid-template-columns: repeat(auto-fit ,minmax(150px,1fr));
    }
    @media screen and (max-width:543px){
        grid-template-columns:repeat(2 ,50%);
    }
    @media screen and (max-width:487px){
        padding-left:0;
        grid-template-columns:repeat(2 ,50%);
    }
    @media screen and (max-width:390px){
        padding-left:0;
        grid-template-columns:repeat(2 ,50%);
        gap:2px;
    }
`
function MoviesGridContainer(props){
    return (
        <Container>
            {props.movies && props.movies.length >= 1?props.movies.map((movie)=>{
                return <MovieCard 
                    hoverScale={true}
                    page_id={movie.id} 
                    duration={movie.duration}
                    genres={movie.genre}
                    key={movie.id} 
                    id={movie.id} 
                    rated={movie.contentRate} 
                    title={movie.title} 
                    imdb={movie.ratings.imdb}
                    meta={movie.ratings.meta} 
                    plot={movie.plot} 
                    director={movie.director} 
                    poster={movie.poster} 
                    released={movie.released}
                />
            }):<div style={{color:"white",fontSize:"2rem"}}>No Movies available</div>}
        </Container>
    )
}
export default MoviesGridContainer;