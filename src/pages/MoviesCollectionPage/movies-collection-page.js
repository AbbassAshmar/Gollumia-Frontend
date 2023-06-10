import Pagination from "../../components/Pagination/pagination";
import FilterContainer from "../../components/FilterContainer/filter-container";
import { useEffect, useState } from "react";
import { useSearchParams ,useLocation} from "react-router-dom";
import MoviesGridContainer from "../../components/MoviesGridContainer/movies-grid-container";
import MoviesPagesContainers from "../../components/MoviesPagesContainers/movies-pages-containers";


function MoviesCollection(){
    const [movies,setMovies] = useState([])
    const [pagesCount , setPagesCount] = useState(1)
    const [searchParams, setSearchParams] = useSearchParams()
    const [currentPageNumber , setCurrentPageNumber]= useState(searchParams.get('page')?searchParams.get('page'):1)
    const [searchProps, setSearchProps] = useState({params : searchParams,page: 0})

    // request movies with no filters , but with limits (pagination)
    async function requestMovies(){
        const request = await fetch(`http://localhost:8000/api/movies/?limit=35&start=${(currentPageNumber -1)*35}`);
        const moviesList = await request.json()
        if (request.status == 200){
            setMovies(moviesList['movies'])
            setPagesCount(Math.ceil(moviesList['total_count']/35))
        }
    }

    // change currentPageNumber state when page query string changes (by pagination or manual)
    useEffect(()=>{
        if (!searchParams.get('page')){
            setCurrentPageNumber(1)
        }else if (parseInt(searchParams.get("page")) >=1){
            setCurrentPageNumber(parseInt(searchParams.get('page')))
        }
    },[searchParams.get("page")])

    // used for requesting movies (only not filtered), depending on pagination 
    useEffect(()=>{
        if (!searchParams.get('genre') && !searchParams.get('contentRate') && !searchParams.get('released') ) {
            requestMovies()
        }
    },[searchProps])

    // url used for links in pagination components, if filters are present, add them to pagination 
    // this way , pagination can be used for filtered movies too 
    function getUrl(page_number){
        let url = `/movies/?page=${page_number}&`;
        let params_list = ['contentRating','genre','released']
        for (const value of searchParams.entries()){
            for(const param of params_list){
                if (param ==value[0]){
                    url += `${value[0]}=${value[1]}&`
                }
            }
        }
        url = url.slice(0,-1)
        return url;
    }

    function setSearchParamsIfAltered(GetSearchParams){
        if (GetSearchParams != searchParams){
            setSearchParams(GetSearchParams)
        }
    }

    useEffect(()=>{
        setSearchProps({params:searchParams,page:searchParams.get("page")})
    },[searchParams])
    
    return(
        <MoviesPagesContainers children={
            <>
                <FilterContainer 
                    setCurrentPageNumber={setCurrentPageNumber} 
                    setCount={setPagesCount} 
                    setMovies={setMovies} 
                    start={Math.ceil((currentPageNumber-1)*35)}
                    setSearchParamsIfAltered={setSearchParamsIfAltered}
                    searchParams={searchParams}
                    searchProps={searchProps}
                />
                <Pagination url={getUrl} pagesCount={pagesCount} page_number={parseInt(currentPageNumber)}/>
                <MoviesGridContainer movies={movies}/>
                <Pagination url={getUrl} pagesCount={pagesCount} page_number={parseInt(currentPageNumber)}/>
            </>
        }
        />
    )
}

export default MoviesCollection;