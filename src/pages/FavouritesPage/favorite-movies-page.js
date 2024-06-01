import Title from "../../components/Category/title";
import { useState } from "react";
import { useCookies } from "react-cookie";
import MoviesGridContainer from "../../components/MoviesGridContainer/movies-grid-container";
import MoviesPagesContainers from "../../components/MoviesPagesContainers/movies-pages-containers";
import Pagination from "../../components/Pagination/pagination";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function FavoritesPage(){
    const [cookies,setCookies] = useCookies();
    const [favoriteMovies, setFavoriteMovies] = useState([])
    const [totalPagesCount, setTotalPagesCount] = useState(20);
    const [searchParams,setSearchParams] = useSearchParams();

    useEffect(()=>{
        fetchFavoriteMovies(searchParams.get('page'));
    },[searchParams])

    async function fetchFavoriteMovies(page){
        const request = await fetch(`${process.env.REACT_APP_API_URL}/api/users/user/favorites/?page=${page}`,{
            headers: {
                "Content-type":"application/json",
                "Authorization":"Token "+ cookies.token
            }
        })
        const response = await request.json();

        if (request.status == 200){
            console.log(response)
            setFavoriteMovies(response.data.movies);
            setTotalPagesCount(response.metadata.pages_count)
        }
    }

    return(
        <MoviesPagesContainers>
            <Title ctg="Favourites" />
            <Pagination totalPagesCount={totalPagesCount}/>
            <MoviesGridContainer movies={favoriteMovies}/>
            <Pagination totalPagesCount={totalPagesCount}/>
        </MoviesPagesContainers>
    )
}

export default FavoritesPage;