import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import MoviesGridContainer from "../MoviesGridContainer/movies-grid-container";

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
        <MoviesGridContainer movies={movies}/>
        
    )
}

export default CtgMovies;
