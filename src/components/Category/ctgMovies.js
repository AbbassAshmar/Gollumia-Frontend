import { useEffect, useState } from "react";
import { Container } from "../TrendingMovies/TrendingMovies";
import { useCookies } from "react-cookie";
import MovieCard from "../MovieCard/Moviecard";
function CtgMovies(props){
    const [cookies, setCookies] = useCookies(["token"]);
    const [movies,setMovies] = useState([]);
    // useEffect(()=>{
    //     async function get_35_movies(){
    //         let request_movies = await fetch("http://localhost:8000/api/movies/upcoming/?limit=35",{
    //             method:"Get",
    //             headers:{
    //                 "Content-type":"application/json",
    //                 "Authorization":"Token "+cookies.token[0]
    //             }
    //         })
    //         let response = await request_movies.json()
    //         setMovies(response)
    //     }
    //     get_35_movies();
    // },[props])
    let moviess = [
        {
            id: 2,
            image:"https://m.media-amazon.com/images/M/MV5BNjU3M2E3OTktNDFlYy00YzUyLTg4M2EtZDliMDk5M2JhYWVhXkEyXkFqcGdeQXVyNjkwNDQ4MTA@._V1_Ratio2.4000_AL_.jpg",
            poster:"https://m.media-amazon.com/images/M/MV5BOGM3NDViYmUtMjFiOC00MGJhLTlkOTQtNDRmMmEyMmJiYjQ0XkEyXkFqcGdeQXVyNDQwODY1NTY@._V1_SX300.jpg",
            imdb:9.3,
            title: "Children of the Corn"
        },
        {
            id: 2,
            image:"https://m.media-amazon.com/images/M/MV5BNjU3M2E3OTktNDFlYy00YzUyLTg4M2EtZDliMDk5M2JhYWVhXkEyXkFqcGdeQXVyNjkwNDQ4MTA@._V1_Ratio2.4000_AL_.jpg",
            poster:"https://m.media-amazon.com/images/M/MV5BOGM3NDViYmUtMjFiOC00MGJhLTlkOTQtNDRmMmEyMmJiYjQ0XkEyXkFqcGdeQXVyNDQwODY1NTY@._V1_SX300.jpg",
            imdb:9.3,
            title: "Children of the Corn"
        },
        {
            id: 2,
            image:"https://m.media-amazon.com/images/M/MV5BNjU3M2E3OTktNDFlYy00YzUyLTg4M2EtZDliMDk5M2JhYWVhXkEyXkFqcGdeQXVyNjkwNDQ4MTA@._V1_Ratio2.4000_AL_.jpg",
            poster:"https://m.media-amazon.com/images/M/MV5BOGM3NDViYmUtMjFiOC00MGJhLTlkOTQtNDRmMmEyMmJiYjQ0XkEyXkFqcGdeQXVyNDQwODY1NTY@._V1_SX300.jpg",
            imdb:9.3,
            title: "Children of the Corn"
        },
        {
            id: 2,
            image:"https://m.media-amazon.com/images/M/MV5BNjU3M2E3OTktNDFlYy00YzUyLTg4M2EtZDliMDk5M2JhYWVhXkEyXkFqcGdeQXVyNjkwNDQ4MTA@._V1_Ratio2.4000_AL_.jpg",
            poster:"https://m.media-amazon.com/images/M/MV5BOGM3NDViYmUtMjFiOC00MGJhLTlkOTQtNDRmMmEyMmJiYjQ0XkEyXkFqcGdeQXVyNDQwODY1NTY@._V1_SX300.jpg",
            imdb:9.3,
            title: "Children of the Corn"
        },
        {
            id: 2,
            image:"https://m.media-amazon.com/images/M/MV5BNjU3M2E3OTktNDFlYy00YzUyLTg4M2EtZDliMDk5M2JhYWVhXkEyXkFqcGdeQXVyNjkwNDQ4MTA@._V1_Ratio2.4000_AL_.jpg",
            poster:"https://m.media-amazon.com/images/M/MV5BOGM3NDViYmUtMjFiOC00MGJhLTlkOTQtNDRmMmEyMmJiYjQ0XkEyXkFqcGdeQXVyNDQwODY1NTY@._V1_SX300.jpg",
            imdb:9.3,
            title: "Children of the Corn"
        }, 
        {
            id: 2,
            image:"https://m.media-amazon.com/images/M/MV5BNjU3M2E3OTktNDFlYy00YzUyLTg4M2EtZDliMDk5M2JhYWVhXkEyXkFqcGdeQXVyNjkwNDQ4MTA@._V1_Ratio2.4000_AL_.jpg",
            poster:"https://m.media-amazon.com/images/M/MV5BOGM3NDViYmUtMjFiOC00MGJhLTlkOTQtNDRmMmEyMmJiYjQ0XkEyXkFqcGdeQXVyNDQwODY1NTY@._V1_SX300.jpg",
            imdb:9.3,
            title: "Children of the Corn"
        },
        {
            id: 2,
            image:"https://m.media-amazon.com/images/M/MV5BNjU3M2E3OTktNDFlYy00YzUyLTg4M2EtZDliMDk5M2JhYWVhXkEyXkFqcGdeQXVyNjkwNDQ4MTA@._V1_Ratio2.4000_AL_.jpg",
            poster:"https://m.media-amazon.com/images/M/MV5BOGM3NDViYmUtMjFiOC00MGJhLTlkOTQtNDRmMmEyMmJiYjQ0XkEyXkFqcGdeQXVyNDQwODY1NTY@._V1_SX300.jpg",
            imdb:9.3,
            title: "Children of the Corn"
        },
        {
            id: 2,
            image:"https://m.media-amazon.com/images/M/MV5BNjU3M2E3OTktNDFlYy00YzUyLTg4M2EtZDliMDk5M2JhYWVhXkEyXkFqcGdeQXVyNjkwNDQ4MTA@._V1_Ratio2.4000_AL_.jpg",
            poster:"https://m.media-amazon.com/images/M/MV5BOGM3NDViYmUtMjFiOC00MGJhLTlkOTQtNDRmMmEyMmJiYjQ0XkEyXkFqcGdeQXVyNDQwODY1NTY@._V1_SX300.jpg",
            imdb:9.3,
            title: "Children of the Corn"
        }, 
        {
            id: 2,
            image:"https://m.media-amazon.com/images/M/MV5BNjU3M2E3OTktNDFlYy00YzUyLTg4M2EtZDliMDk5M2JhYWVhXkEyXkFqcGdeQXVyNjkwNDQ4MTA@._V1_Ratio2.4000_AL_.jpg",
            poster:"https://m.media-amazon.com/images/M/MV5BOGM3NDViYmUtMjFiOC00MGJhLTlkOTQtNDRmMmEyMmJiYjQ0XkEyXkFqcGdeQXVyNDQwODY1NTY@._V1_SX300.jpg",
            imdb:9.3,
            title: "Children of the Corn"
        },
        {
            id: 2,
            image:"https://m.media-amazon.com/images/M/MV5BNjU3M2E3OTktNDFlYy00YzUyLTg4M2EtZDliMDk5M2JhYWVhXkEyXkFqcGdeQXVyNjkwNDQ4MTA@._V1_Ratio2.4000_AL_.jpg",
            poster:"https://m.media-amazon.com/images/M/MV5BOGM3NDViYmUtMjFiOC00MGJhLTlkOTQtNDRmMmEyMmJiYjQ0XkEyXkFqcGdeQXVyNDQwODY1NTY@._V1_SX300.jpg",
            imdb:9.3,
            title: "Children of the Corn"
        },
        {
            id: 2,
            image:"https://m.media-amazon.com/images/M/MV5BNjU3M2E3OTktNDFlYy00YzUyLTg4M2EtZDliMDk5M2JhYWVhXkEyXkFqcGdeQXVyNjkwNDQ4MTA@._V1_Ratio2.4000_AL_.jpg",
            poster:"https://m.media-amazon.com/images/M/MV5BOGM3NDViYmUtMjFiOC00MGJhLTlkOTQtNDRmMmEyMmJiYjQ0XkEyXkFqcGdeQXVyNDQwODY1NTY@._V1_SX300.jpg",
            imdb:9.3,
            title: "Children of the Corn"
        }, 
        {
            id: 2,
            image:"https://m.media-amazon.com/images/M/MV5BNjU3M2E3OTktNDFlYy00YzUyLTg4M2EtZDliMDk5M2JhYWVhXkEyXkFqcGdeQXVyNjkwNDQ4MTA@._V1_Ratio2.4000_AL_.jpg",
            poster:"https://m.media-amazon.com/images/M/MV5BOGM3NDViYmUtMjFiOC00MGJhLTlkOTQtNDRmMmEyMmJiYjQ0XkEyXkFqcGdeQXVyNDQwODY1NTY@._V1_SX300.jpg",
            imdb:9.3,
            title: "Children of the Corn"
        },
        {
            id: 2,
            image:"https://m.media-amazon.com/images/M/MV5BNjU3M2E3OTktNDFlYy00YzUyLTg4M2EtZDliMDk5M2JhYWVhXkEyXkFqcGdeQXVyNjkwNDQ4MTA@._V1_Ratio2.4000_AL_.jpg",
            poster:"https://m.media-amazon.com/images/M/MV5BOGM3NDViYmUtMjFiOC00MGJhLTlkOTQtNDRmMmEyMmJiYjQ0XkEyXkFqcGdeQXVyNDQwODY1NTY@._V1_SX300.jpg",
            imdb:9.3,
            title: "Children of the Corn"
        },
        {
            id: 2,
            image:"https://m.media-amazon.com/images/M/MV5BNjU3M2E3OTktNDFlYy00YzUyLTg4M2EtZDliMDk5M2JhYWVhXkEyXkFqcGdeQXVyNjkwNDQ4MTA@._V1_Ratio2.4000_AL_.jpg",
            poster:"https://m.media-amazon.com/images/M/MV5BOGM3NDViYmUtMjFiOC00MGJhLTlkOTQtNDRmMmEyMmJiYjQ0XkEyXkFqcGdeQXVyNDQwODY1NTY@._V1_SX300.jpg",
            imdb:9.3,
            title: "Children of the Corn"
        }, 
        {
            id: 2,
            image:"https://m.media-amazon.com/images/M/MV5BNjU3M2E3OTktNDFlYy00YzUyLTg4M2EtZDliMDk5M2JhYWVhXkEyXkFqcGdeQXVyNjkwNDQ4MTA@._V1_Ratio2.4000_AL_.jpg",
            poster:"https://m.media-amazon.com/images/M/MV5BOGM3NDViYmUtMjFiOC00MGJhLTlkOTQtNDRmMmEyMmJiYjQ0XkEyXkFqcGdeQXVyNDQwODY1NTY@._V1_SX300.jpg",
            imdb:9.3,
            title: "Children of the Corn"
        },
        {
            id: 2,
            image:"https://m.media-amazon.com/images/M/MV5BNjU3M2E3OTktNDFlYy00YzUyLTg4M2EtZDliMDk5M2JhYWVhXkEyXkFqcGdeQXVyNjkwNDQ4MTA@._V1_Ratio2.4000_AL_.jpg",
            poster:"https://m.media-amazon.com/images/M/MV5BOGM3NDViYmUtMjFiOC00MGJhLTlkOTQtNDRmMmEyMmJiYjQ0XkEyXkFqcGdeQXVyNDQwODY1NTY@._V1_SX300.jpg",
            imdb:9.3,
            title: "Children of the Corn"
        },
        {
            id: 2,
            image:"https://m.media-amazon.com/images/M/MV5BNjU3M2E3OTktNDFlYy00YzUyLTg4M2EtZDliMDk5M2JhYWVhXkEyXkFqcGdeQXVyNjkwNDQ4MTA@._V1_Ratio2.4000_AL_.jpg",
            poster:"https://m.media-amazon.com/images/M/MV5BOGM3NDViYmUtMjFiOC00MGJhLTlkOTQtNDRmMmEyMmJiYjQ0XkEyXkFqcGdeQXVyNDQwODY1NTY@._V1_SX300.jpg",
            imdb:9.3,
            title: "Children of the Corn"
        }, 
        {
            id: 2,
            image:"https://m.media-amazon.com/images/M/MV5BNjU3M2E3OTktNDFlYy00YzUyLTg4M2EtZDliMDk5M2JhYWVhXkEyXkFqcGdeQXVyNjkwNDQ4MTA@._V1_Ratio2.4000_AL_.jpg",
            poster:"https://m.media-amazon.com/images/M/MV5BOGM3NDViYmUtMjFiOC00MGJhLTlkOTQtNDRmMmEyMmJiYjQ0XkEyXkFqcGdeQXVyNDQwODY1NTY@._V1_SX300.jpg",
            imdb:9.3,
            title: "Children of the Corn"
        },
        {
            id: 2,
            image:"https://m.media-amazon.com/images/M/MV5BNjU3M2E3OTktNDFlYy00YzUyLTg4M2EtZDliMDk5M2JhYWVhXkEyXkFqcGdeQXVyNjkwNDQ4MTA@._V1_Ratio2.4000_AL_.jpg",
            poster:"https://m.media-amazon.com/images/M/MV5BOGM3NDViYmUtMjFiOC00MGJhLTlkOTQtNDRmMmEyMmJiYjQ0XkEyXkFqcGdeQXVyNDQwODY1NTY@._V1_SX300.jpg",
            imdb:9.3,
            title: "Children of the Corn"
        },
        {
            id: 2,
            image:"https://m.media-amazon.com/images/M/MV5BNjU3M2E3OTktNDFlYy00YzUyLTg4M2EtZDliMDk5M2JhYWVhXkEyXkFqcGdeQXVyNjkwNDQ4MTA@._V1_Ratio2.4000_AL_.jpg",
            poster:"https://m.media-amazon.com/images/M/MV5BOGM3NDViYmUtMjFiOC00MGJhLTlkOTQtNDRmMmEyMmJiYjQ0XkEyXkFqcGdeQXVyNDQwODY1NTY@._V1_SX300.jpg",
            imdb:9.3,
            title: "Children of the Corn"
        }, 
        {
            id: 2,
            image:"https://m.media-amazon.com/images/M/MV5BNjU3M2E3OTktNDFlYy00YzUyLTg4M2EtZDliMDk5M2JhYWVhXkEyXkFqcGdeQXVyNjkwNDQ4MTA@._V1_Ratio2.4000_AL_.jpg",
            poster:"https://m.media-amazon.com/images/M/MV5BOGM3NDViYmUtMjFiOC00MGJhLTlkOTQtNDRmMmEyMmJiYjQ0XkEyXkFqcGdeQXVyNDQwODY1NTY@._V1_SX300.jpg",
            imdb:9.3,
            title: "Children of the Corn"
        },
        {
            id: 2,
            image:"https://m.media-amazon.com/images/M/MV5BNjU3M2E3OTktNDFlYy00YzUyLTg4M2EtZDliMDk5M2JhYWVhXkEyXkFqcGdeQXVyNjkwNDQ4MTA@._V1_Ratio2.4000_AL_.jpg",
            poster:"https://m.media-amazon.com/images/M/MV5BOGM3NDViYmUtMjFiOC00MGJhLTlkOTQtNDRmMmEyMmJiYjQ0XkEyXkFqcGdeQXVyNDQwODY1NTY@._V1_SX300.jpg",
            imdb:9.3,
            title: "Children of the Corn"
        },
        {
            id: 2,
            image:"https://m.media-amazon.com/images/M/MV5BNjU3M2E3OTktNDFlYy00YzUyLTg4M2EtZDliMDk5M2JhYWVhXkEyXkFqcGdeQXVyNjkwNDQ4MTA@._V1_Ratio2.4000_AL_.jpg",
            poster:"https://m.media-amazon.com/images/M/MV5BOGM3NDViYmUtMjFiOC00MGJhLTlkOTQtNDRmMmEyMmJiYjQ0XkEyXkFqcGdeQXVyNDQwODY1NTY@._V1_SX300.jpg",
            imdb:9.3,
            title: "Children of the Corn"
        }, 
        {
            id: 2,
            image:"https://m.media-amazon.com/images/M/MV5BNjU3M2E3OTktNDFlYy00YzUyLTg4M2EtZDliMDk5M2JhYWVhXkEyXkFqcGdeQXVyNjkwNDQ4MTA@._V1_Ratio2.4000_AL_.jpg",
            poster:"https://m.media-amazon.com/images/M/MV5BOGM3NDViYmUtMjFiOC00MGJhLTlkOTQtNDRmMmEyMmJiYjQ0XkEyXkFqcGdeQXVyNDQwODY1NTY@._V1_SX300.jpg",
            imdb:9.3,
            title: "Children of the Corn"
        },
        {
            id: 2,
            image:"https://m.media-amazon.com/images/M/MV5BNjU3M2E3OTktNDFlYy00YzUyLTg4M2EtZDliMDk5M2JhYWVhXkEyXkFqcGdeQXVyNjkwNDQ4MTA@._V1_Ratio2.4000_AL_.jpg",
            poster:"https://m.media-amazon.com/images/M/MV5BOGM3NDViYmUtMjFiOC00MGJhLTlkOTQtNDRmMmEyMmJiYjQ0XkEyXkFqcGdeQXVyNDQwODY1NTY@._V1_SX300.jpg",
            imdb:9.3,
            title: "Children of the Corn"
        }
    ]
    console.log("000000000000000")
    return(
        <Container>
        {   
            moviess.map((movie)=>{
                return <MovieCard 
                page_id={movie.id} 
                key={movie.id} 
                id={movie.id} 
                title={movie.title} 
                imdb={movie.imdb} 
                poster={movie.poster} 
                image = {movie.image}
                />
            })
        }
        </Container>
        
    )
}

export default CtgMovies;
