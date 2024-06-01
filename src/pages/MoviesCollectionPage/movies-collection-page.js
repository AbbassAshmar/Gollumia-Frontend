import Pagination from "../../components/Pagination/pagination";
import FilterContainer from "../../components/FilterContainer/filter-container";
import { useEffect, useState } from "react";
import { useSearchParams ,useLocation} from "react-router-dom";
import MoviesGridContainer from "../../components/MoviesGridContainer/movies-grid-container";
import MoviesPagesContainers from "../../components/MoviesPagesContainers/movies-pages-containers";


function MoviesCollection(){
    const [movies,setMovies] = useState([])
    const [totalPagesCount , setTotalPagesCount] = useState(40)

    const [searchParams, setSearchParams] = useSearchParams()
    const [title , setTitle] = useState("All Movies");

    useEffect(()=>{
        if (searchParams.get("genre"))
        setTitle("All " +  searchParams.get("genre") + " Movies");
    },[searchParams])

    useEffect(()=>{
        let URL = `${process.env.REACT_APP_API_URL}/api/movies/`;
        URL = constructURL(URL, searchParams);
        fetchMovies(URL);
    },[searchParams])

    function constructURL(url,searchParams){
        url = (url.includes("?") ? url + "&" : url + "?");
        for(let value of searchParams.entries()){
            url += `${value[0]}=${value[1]}&`;
        }
        
        return url.substring(0, url. length - 1);
    }

    async function fetchMovies(url){
        const request = await fetch(url);
        if (request.status == 200){
            const moviesList = await request.json()
            setMovies(moviesList.data.movies)
            setTotalPagesCount(moviesList.metadata.pages_count)
        }
    }

    return(
        <MoviesPagesContainers>
            <FilterContainer title={title}/>
            <Pagination totalPagesCount={totalPagesCount} />
            <MoviesGridContainer movies={movies}/>
            <Pagination totalPagesCount={totalPagesCount} />
        </MoviesPagesContainers>
        
    )
}

export default MoviesCollection;