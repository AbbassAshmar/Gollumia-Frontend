import Pagination from "../../components/Pagination/pagination";
import FilterContainer from "../../components/Filter/filter-container";
import { useEffect, useState } from "react";
import { useSearchParams ,useLocation} from "react-router-dom";
import MoviesGridContainer from "../../components/MoviesGridContainer/movies-grid-container";
import MoviesPagesContainers from "../../components/MoviesPagesContainers/movies-pages-containers";


function MoviesCollection(){
    const [movies,setMovies] = useState([])
    const [totalPagesCount , setTotalPagesCount] = useState(10)

    const [searchParams, setSearchParams] = useSearchParams()
    const [title , setTitle] = useState("All Movies");

    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        if (searchParams.get("genre"))
        setTitle(searchParams.get("genre") + " Movies");
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
        setIsLoading(true)
        const request = await fetch(url);
        const moviesList = await request.json()

        if (request.status == 200){
            setMovies(moviesList.data.movies)
            setTotalPagesCount(moviesList.metadata.pages_count)
        }
        else{
            setTotalPagesCount(0) 
            setMovies([]);
        }
        setIsLoading(false)
    }

    return(
        <MoviesPagesContainers>
            <FilterContainer title={title}/>
            <Pagination totalPagesCount={totalPagesCount} />
            <MoviesGridContainer isLoading={isLoading} movies={movies}/>
            <Pagination totalPagesCount={totalPagesCount} />
        </MoviesPagesContainers>
        
    )
}

export default MoviesCollection;