// import { useParams,useSearchParams } from "react-router-dom";
// import Title from "../../components/Category/title";
// import MoviesPagesContainers from "../../components/MoviesPagesContainers/movies-pages-containers";
// import PaginationBlock from "../../components/PaginationBlock/pagination-block";
// import { useEffect, useState } from "react";


// function SearchPage(){
//     const [searchParams, setSearchParams] = useSearchParams()
//     const [pagesCount, setPagesCount] = useState(1)
//     const [searchedMovies,setSearchedMovies] = useState([])
//     const {searchedKeyWord} = useParams()

//     async function request_searched_movies(){
//         const request = await fetch(`http://127.0.0.1:8000/api/movies/search/?title=${searchedKeyWord}&limit=${limit}&start=${start}`)
//         const response = await request.json()

//         if (request.status == 200){
//             setSearchedMovies(response.movies)
//             setPagesCount(request.total_count)
//         }
//     }


//     return (
//         <MoviesPagesContainers>
//             <Title ctg={`Search Results For ${searchedKeyWord}`}/>

//             <PaginationBlock 
//                 children={<MoviesGridContainer movies={searchedMovies}/>}
//                 url ={`/movies/search/${searchedKeyWord}`}
//                 request_movies={request_searched_movies}
//                 pagesCount={pagesCount}
//             />

//         </MoviesPagesContainers> 
//     )
// }

// export default SearchPage;