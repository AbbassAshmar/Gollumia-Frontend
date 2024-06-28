import { useEffect } from "react";
import { useState } from "react";
import MoviesGridContainer from "../../components/MoviesGridContainer/movies-grid-container";
import Title from "../../components/Title/title";
import Pagination from "../../components/Pagination/pagination";
import MoviesPagesContainers from "../../components/MoviesPagesContainers/movies-pages-containers";
import {  useSearchParams } from "react-router-dom";

function TopImdbPage(){
    const [movies, setMovies] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [totalPagesCount, setTotalPagesCount] = useState(20);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        fetchTopIMDBMovies(searchParams.get("page"))
    },[searchParams])

    async function fetchTopIMDBMovies(page){
        const URL = `${process.env.REACT_APP_API_URL}/api/movies/top-imdb/?page=${page}`;

        try{
            const request = await fetch(URL);
            const response = await request.json()

            if (request.status === 200){
                setMovies(response.data.movies)
                setTotalPagesCount(response.metadata.pages_count)
            }else{
                setMovies([])
                setTotalPagesCount(0); 
            }
        }catch(error){
            setMovies([])
            setTotalPagesCount(0);
        }

        setIsLoading(false);
    }

    return (
        <MoviesPagesContainers>
            <Title text={"Top Imdb Movies"} />
            <Pagination totalPagesCount={totalPagesCount}/>
            <MoviesGridContainer isLoading={isLoading} movies={movies}/>
            <Pagination totalPagesCount={totalPagesCount}/>
        </MoviesPagesContainers>
    )
}

export default TopImdbPage;