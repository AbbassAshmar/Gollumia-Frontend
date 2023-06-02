import { useEffect, useState } from "react";
import { Container } from "../TrendingMovies/TrendingMovies";
import { useCookies } from "react-cookie";
import MovieCard from "../MovieCard/Moviecard";
function CtgMovies(props){
    const [cookies, setCookies] = useCookies(["token"]);
    const [movies,setMovies] = useState([]);
    async function get_limited_movies_by_category(category,start,limit){
        let request_movies = await fetch(`http://localhost:8000/api/movies/${category}/?start=${start}&limit=${limit}`,{
            method:"Get",
            headers:{
                "Content-type":"application/json",
                "Authorization":"Token "+cookies.token
            }
        })
        let response = await request_movies.json();
        if (request_movies.status == 200){
            setMovies(response['movies']);
        }
    }

    // call the fetch function
    useEffect(()=>{  
        let limit  = 35;
        let start= (parseInt(props.page_number) -1) * limit;
        get_limited_movies_by_category(props.category,start,limit);
    },[props])
    

    return(
        <Container>
        {   movies.length >=1 ?
            movies.map((movie)=>{
                return <MovieCard 
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
            }) :
            <div style={{height:"12.4vh"}}></div>
        }
        </Container>
        
    )
}

export default CtgMovies;
