import App from "../../../components/Footer/Footer";
import MoviesNav from "../../../components/MainNavbar/moviesNavbar";
import styled from "styled-components";
import { MoviesContainer,Main } from "../../CategoriesMoviePage/AllMoviesByCat";
import Pagination from "../../../components/Pagination/pagination";
import MoviesCollectionComp from "../../../components/MoviesCollectionComponent/MoviesCollectionComponent";
import FilterHeader from "../../../components/FilterHeader/filterheader";
import FilterContainer from "../../../components/FilterContainer/filtercontainer";
import { useEffect, useState } from "react";
import { useSearchParams ,useLocation} from "react-router-dom";


function MoviesCollection(){
    const [movies,setMovies] = useState([])
    const [pagesCount , setPagesCount] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams()
    const [currentPageNumber , setCurrentPageNumber]= useState(searchParams.get('page')?searchParams.get('page'):1)
    const [checkfilter , setCheckFilter] = useState(false)

    // request movies with no filters , but with limits (pagination)
    async function requestMovies(){
        const request = await fetch(`http://localhost:8000/api/movies/?limit=35&start=${(currentPageNumber -1)*35}`);
        const moviesList = await request.json()
        if (request.status == 200){
            console.log(moviesList)
            setMovies(moviesList['movies'])
            setPagesCount(Math.ceil(moviesList['total_count']/35))
        }
    }

    // change currentPageNumber state when page query string changes (by pagination or manual)
    useEffect(()=>{
        if (searchParams.get("page") && searchParams.get("page") >=1){
            setCurrentPageNumber(searchParams.get('page'))
        }
    },[searchParams.get("page")])

    // used for requesting movies (only not filtered), depending on pagination 
    useEffect(()=>{
        if (!searchParams.get('genre') && !searchParams.get('contentRate') && !searchParams.get('released') ) {
            requestMovies()
        }
    },[currentPageNumber])

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

    return(
        <div style={{background:"black"}}>
            <MoviesNav/>
            <Main>
                <MoviesContainer>
                    {/* request should cantain start?limit?filters? */}
                    <FilterContainer setCheckFilter={setCheckFilter} setCurrentPageNumber={setCurrentPageNumber} 
                    setCount={setPagesCount} setMovies={setMovies} start={(currentPageNumber -1)*35}/>
                    <Pagination url={getUrl} pagesCount={pagesCount} page_number={parseInt(currentPageNumber)}/>
                    <MoviesCollectionComp movies={movies}/>
                    <Pagination url={getUrl} pagesCount={pagesCount} page_number={parseInt(currentPageNumber)}/>
                </MoviesContainer>
            </Main>
            <div>
                <App/>
            </div>
        </div>
    )
}

export default MoviesCollection;