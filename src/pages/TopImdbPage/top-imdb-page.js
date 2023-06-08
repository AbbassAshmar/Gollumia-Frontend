import App from "../../components/Footer/footer";
import MoviesNav from "../../components/MainNavbar/movies-navbar";
import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";
import MoviesGridContainer from "../../components/MoviesGridContainer/movies-grid-container";
import Title from "../../components/Category/title";
import Pagination from "../../components/Pagination/pagination";
import { useLocation, useSearchParams } from "react-router-dom";

const Main = styled.div`
    background:black;
    margin:0 0 0 1.3rem;
`
function TopImdbPage(){
    const [movies, setMovies] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [currentPageNumber,setCurrentPageNumber] = useState(1)
    const [pagesCount, setPagesCount] = useState(1)
    const location = useLocation()

    async function request_top_imdb_movies(){
        let start =(currentPageNumber -1)*35
        const request = await fetch(`http://127.0.0.1:8000/api/movies/top-imdb/?limit=${35}&start=${start}`)
        const top_imdb_movies = await request.json()
        if (request.status === 200){
            setMovies(top_imdb_movies['movies'])
            setPagesCount(Math.ceil(top_imdb_movies['total_count'] / 35))
        }
    }

    // update the state of the page number (searchParam) on location change
    useEffect(()=>{
        if (searchParams.get("page") && searchParams.get("page") >=1){
            setCurrentPageNumber(parseInt(searchParams.get("page")))
        }
    },[location.search])

    useEffect(()=>{
        request_top_imdb_movies()
    },[currentPageNumber])

    function getUrl(pageNumber){
        return `/movies/top-imdb/?page=${pageNumber}`
    }
    return (
        <div style={{background:"black"}}>
            <MoviesNav />
            <Main>
                <Title ctg={"Top Imdb Movies"} />
                <Pagination url={getUrl} pagesCount={pagesCount} page_number={currentPageNumber}/>
                <MoviesGridContainer movies={movies}/>
                <Pagination url={getUrl} pagesCount={pagesCount} page_number={currentPageNumber}/>
            </Main>
            <div>
                <App />
            </div>
        </div>
    )
}

export default TopImdbPage;