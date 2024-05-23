import Title from "../../components/Category/title";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import MoviesGridContainer from "../../components/MoviesGridContainer/movies-grid-container";
import MoviesPagesContainers from "../../components/MoviesPagesContainers/movies-pages-containers";
import PaginationBlock from "../../components/PaginationBlock/pagination-block";

function FavoritesPage(){
    const [favoriteMovies, setFavoriteMovies] = useState([])
    const [cookies,setCookies] = useCookies();
    const [pagesCount , setPagesCount] = useState(1)
    const {id} = useParams()


    async function request_favorite_movies(currentPageNumber){
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
            setPagesCount(Math.ceil(response['total_count'] / 35))
        }
    }

    return(
        <MoviesPagesContainers>
            <Title ctg="Favourites" />
            <PaginationBlock 
                children={<MoviesGridContainer movies={favoriteMovies}/>}
                url ={`/movies/${id}/favorites`}
                request_movies={request_favorite_movies}
                pagesCount={pagesCount}
            />
        </MoviesPagesContainers>
    )
}

export default FavoritesPage;