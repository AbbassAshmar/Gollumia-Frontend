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
    const [currentPageNumber , setCurrentPageNumber]= useState(searchParams.get('page')?searchParams.get('page'):1)

    const [searchProps, setSearchProps] = useState({params : searchParams,page: 0})
    const [title , setTitle] = useState("All Movies")
    
    // request movies with no filters , but with limits (pagination)
    async function fetchMovies(){
        const request = await fetch(`${process.env.REACT_APP_API_URL}/api/movies/?limit=35&start=${(currentPageNumber -1)*35}`);
        const moviesList = await request.json()
        if (request.status == 200){
            setMovies(moviesList.data.movies)
            setTotalPagesCount(moviesList.metadata.pages_count)
        }
    }

    // used for requesting movies (only not filtered), depending on pagination 
    useEffect(()=>{
        if (searchParams.get('title')){
            setTitle("Search results for " + searchParams.get('title'))
        }else if (!searchParams.get('title') && 
                    searchParams.get('genre') && 
                    !searchParams.get('contentRate') && 
                    !searchParams.get('released')){
            setTitle("All "+searchParams.get('genre')+" Movies")
        }else{
            setTitle("All Movies")
        }
        if (!searchParams.get('title') && 
            !searchParams.get('genre') && 
            !searchParams.get('contentRate') && 
            !searchParams.get('released')) {     
            fetchMovies()
        }
    },[searchProps])

    // url used for links in pagination components, if filters are present, add them to pagination 
    // this way , pagination can be used for filtered movies too 

    // function getUrl(page_number){
    //     let url = `/movies/?page=${page_number}&`;
    //     let params_list = ['title','contentRating','genre','released']
    //     for (const value of searchParams.entries()){
    //         for(const param of params_list){
    //             if (param ==value[0]){
    //                 url += `${value[0]}=${value[1]}&`
    //             }
    //         }
    //     }
    //     url = url.slice(0,-1)
    //     return url;
    // }

    function setSearchParamsIfAltered(GetSearchParams){
        if (GetSearchParams != searchParams){
            setSearchParams(GetSearchParams)
        }
    }

    useEffect(()=>{
        setSearchProps({params:searchParams,page:searchParams.get("page")})
    },[searchParams])
    
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