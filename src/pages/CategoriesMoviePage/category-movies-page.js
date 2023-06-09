import { useParams } from "react-router-dom"
import Title from "../../components/Category/title";
import {useState } from "react";
import MoviesPagesContainers from "../../components/MoviesPagesContainers/movies-pages-containers";
import PaginationBlock from "../../components/PaginationBlock/pagination-block";
import MoviesGridContainer from "../../components/MoviesGridContainer/movies-grid-container";

export function CategorizedMovies(){
    const {category} = useParams()
    const [pagesCount , setPagesCount] = useState(1)
    const [movies,setMovies] = useState([]);

    async function get_limited_movies_by_category(currentPageNumber){
        let limit = 35
        let start =(currentPageNumber -1) *limit
        let request_movies = await fetch(`http://localhost:8000/api/movies/${category}/?start=${start}&limit=${limit}`)
        let response = await request_movies.json();
        if (request_movies.status == 200){
            setMovies(response['movies']);
            console.log(response)
            if (response['total_count']){
                setPagesCount(Math.ceil(response['total_count'] / 35))
            }
        }
    }
    return(
        <MoviesPagesContainers children={
            < >
                <Title veiwall={false} ctg={`All ${category} Movies`}/>
                <PaginationBlock
                    children={<MoviesGridContainer movies={movies}/>}
                    url={`/movies/category/${category}`}
                    pagesCount={pagesCount}
                    request_movies={get_limited_movies_by_category}
                />
            </>
        }/>
    )
}

