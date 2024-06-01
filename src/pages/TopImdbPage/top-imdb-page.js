import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";
import MoviesGridContainer from "../../components/MoviesGridContainer/movies-grid-container";
import Title from "../../components/Category/title";
import Pagination from "../../components/Pagination/pagination";
import MoviesPagesContainers from "../../components/MoviesPagesContainers/movies-pages-containers";
import { useSearchParams } from "react-router-dom";

const Main = styled.div`
    background:black;
    margin:0 0 0 1.3rem;
`
function TopImdbPage(){
    const [movies, setMovies] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [totalPagesCount, setTotalPagesCount] = useState(20);

    useEffect(()=>{
        fetchTopIMDBMovies(searchParams.get("page"))
    },[searchParams])

    async function fetchTopIMDBMovies(page){
        const request = await fetch(`${process.env.REACT_APP_API_URL}/api/movies/top-imdb/?page=${page}`)
        const response = await request.json()
        if (request.status === 200){
            setMovies(response.data.movies)
            setTotalPagesCount(response.metadata.pages_count)
        }
    }

    return (
        <MoviesPagesContainers>
            <Title ctg={"Top Imdb Movies"} />
            <Pagination totalPagesCount={totalPagesCount}/>
            <MoviesGridContainer movies={movies}/>
            <Pagination totalPagesCount={totalPagesCount}/>
        </MoviesPagesContainers>
    )
}

export default TopImdbPage;