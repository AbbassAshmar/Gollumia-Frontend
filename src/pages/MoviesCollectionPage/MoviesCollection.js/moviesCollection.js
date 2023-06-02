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

    const location = useLocation()
    

    // useEffect(()=>{
    //     setCurrentPageNumber(searchParams.get('page'))
    //     requestMoviesOnLoad()
    // },[searchParams])


    async function requestMoviesOnLoad(){
        const request = await fetch(`http://localhost:8000/api/movies/?limit=35&start=${(currentPageNumber -1)*35}`);
        const moviesList = await request.json()
        if (request.status == 200){
            setMovies(moviesList['movies'])
        }
    }
    async function requestMoviesCountOnLoad(){
        const request = await fetch(`http://localhost:8000/api/movies/count/`);
        const moviesCountResponse = await request.json()
        if (request.status == 200){
            setPagesCount(Math.ceil(moviesCountResponse['movies_count']/35))
        }
    }
    useEffect(()=>{
        requestMoviesCountOnLoad();
    },[])

    useEffect(()=>{
        if (searchParams.get("page") && searchParams.get("page") >=1){
            setCurrentPageNumber(searchParams.get('page'))
            requestMoviesOnLoad()
        }
    },[searchParams.get("page")])
    // useEffect(()=>{
    //     console.log(pagesCount)},
    // [pagesCount])


    function getUrl(page_number){
        return `/movies/?page=${page_number}`
    }
    return(
        <div style={{background:"black"}}>
            <MoviesNav/>
            <Main>
                <MoviesContainer>
                    {/* request should cantain start?limit?filters? */}
                    <FilterContainer setCount={setPagesCount} setMovies={setMovies} />
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