import Category from "../../components/Category/title";
import App from "../../components/Footer/footer";
import Title from "../../components/MainNavbar/movies-navbar";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import MoviesGridContainer from "../../components/MoviesGridContainer/movies-grid-container";

const Main = styled.div`
    margin: 0 0 0 1.3rem;
`

function FavoritesPage(){
    const [favoriteMovies, setFavoriteMovies] = useState([])
    const [cookies,setCookies] = useCookies();
    const {id} = useParams()
    async function request_favorite_movies(){
        const request = await fetch(`http://127.0.0.1:8000/api/movies/favorites/${id}/`,{
            headers: {
                "Content-type":"application/json",
                "Authorization":"Token "+cookies.token
            }
        })
        const response = await request.json();
        if (request.status == 200){
            
            setFavoriteMovies(response['movies'])
        }
    }
    useEffect(()=>{
        request_favorite_movies()
    },[])
    return(
        <div style={{background:"black"}}>
            <Title />
            <Main>
                <Category ctg="favorites" />
                <MoviesGridContainer movies={favoriteMovies}/>
            </Main>
            <div>
                <App />
            </div>
        </div>

    )

}

export default FavoritesPage;