import Title from "../../components/Category/title";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import MoviesGridContainer from "../../components/MoviesGridContainer/movies-grid-container";
import MoviesPagesContainers from "../../components/MoviesPagesContainers/movies-pages-containers";
import Pagination from "../../components/Pagination/pagination";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function FavoritesPage(){
    const [favoriteMovies, setFavoriteMovies] = useState([])
    const [cookies,setCookies] = useCookies();
    const [searchParams, setSearchParams] = useSearchParams()
    const [currentPageNumber, setCurrentPageNumber] =useState(searchParams.get("page")?searchParams.get("page"):1)
    const [pagesCount , setPagesCount] = useState(1)
    const location = useLocation()
    const {id} = useParams()


    async function request_favorite_movies(){
        let limit = 35
        let start = (currentPageNumber-1) * 35
        const request = await fetch(`http://127.0.0.1:8000/api/movies/favorites/${id}/?start=${start}&limit=${limit}`,{
            headers: {
                "Content-type":"application/json",
                "Authorization":"Token "+cookies.token
            }
        })
        const response = await request.json();
        if (request.status == 200){
            setFavoriteMovies(response['movies'])
            setPagesCount(response['total_count'])
        }
    }

    useEffect(()=>{
        request_favorite_movies()
    },[currentPageNumber])

    // update the state of the page number (searchParam) on location change
    useEffect(()=>{
        if (searchParams.get("page") && searchParams.get("page") >=1){
        setCurrentPageNumber(parseInt(searchParams.get("page")))}
    },[location.search])


    function getUrl(currentPageNumber){
        return `/movies/${id}/favorites/?page=${currentPageNumber}`
    }

    return(
        <MoviesPagesContainers children={
            <>
                <Title ctg="Favourites" />
                <Pagination url={getUrl} pagesCount={pagesCount} page_number={currentPageNumber}/>
                <MoviesGridContainer movies={favoriteMovies}/>
                <Pagination url={getUrl} pagesCount={pagesCount} page_number={currentPageNumber}/>

            </>
        }/>
    )
}

export default FavoritesPage;