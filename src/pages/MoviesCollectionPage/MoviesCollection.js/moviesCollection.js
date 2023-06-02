import App from "../../../components/Footer/Footer";
import MoviesNav from "../../../components/MainNavbar/moviesNavbar";
import styled from "styled-components";
import { MoviesContainer,Main } from "../../CategoriesMoviePage/AllMoviesByCat";
import Pagination from "../../../components/Pagination/pagination";
import MoviesCollectionComp from "../../../components/MoviesCollectionComponent/MoviesCollectionComponent";
import FilterHeader from "../../../components/FilterHeader/filterheader";
import FilterContainer from "../../../components/FilterContainer/filtercontainer";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";


function MoviesCollection(){
    const [movies,setMovies] = useState([])
    const [pagesCount , setPagesCount] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams()
    const [currentPageNumber , setCurrentPageNumber]= useState(searchParams.get('page')?searchParams.get('page'):1)
    useEffect(()=>{
        setCurrentPageNumber(searchParams.get('page'))
    },[searchParams])
    async function requestMoviesOnLoad(){
        console.log(currentPageNumber)
        const request = await fetch(`http://localhost:8000/api/movies/?limit=35&start=${currentPageNumber*35}`);
        const moviesList = await request.json()
        if (request.status == 200){
            setMovies(moviesList['movies'])
            setPagesCount(Math.ceil(moviesList['count']/35))
        }
    }
    useEffect(()=>{
        requestMoviesOnLoad();
    },[])
    function getUrl(page_number){
        return `/movies/?page=${page_number}`
    }
    return(
        <div style={{background:"black"}}>
            <MoviesNav/>
            <Main>
                <MoviesContainer>
                    {/* request should cantain start?limit?filters? */}
                    <FilterContainer setMovies={setMovies} />
                    <Pagination url={getUrl} pagesCount={pagesCount} page_number={currentPageNumber}/>
                    <MoviesCollectionComp movies={movies}/>
                    <Pagination url={getUrl} pagesCount={pagesCount} page_number={currentPageNumber}/>
                </MoviesContainer>
            </Main>
            <div>
                <App/>
            </div>


        </div>
    )
}

export default MoviesCollection;