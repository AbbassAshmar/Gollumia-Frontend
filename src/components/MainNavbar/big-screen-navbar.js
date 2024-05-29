import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../Logo/logo";
import SearchBar from "./components/SearchBar/search-bar";
import UserProfileOrSignIn from "./components/UserProfileOrSignIn/user-profile-or-sign-in";
import useGetGenres from "../../hooks/use-get-genres";

const Container = styled.div`
display: flex;
width:100%;
padding:1rem 2rem;
align-items:center;
justify-content: space-between;
background-color: black;
@media screen and (max-width: 1024px) {
    display: none;
}
`
const ElementsContainer = styled.div`
gap:2rem;
display: flex;
width:100%;
justify-content: flex-start;
`
const Element = styled(Link)`
margin:0;
color:white;
gap: 0.5rem;
display: flex;
align-items: center;
text-decoration: none;
font-size: 1rem;
&:hover{
    color:orange;
}
`
const GenreContainer =styled.div`
position:relative;
display: flex;
align-items: center;
`

const GenreWord = styled.div`
height: calc(100% + 2rem);
color:white;
position: relative;
gap: 0.5rem;
display: flex;
cursor:pointer;
align-items: center;
&:hover{
    color:orange;
}
`
const GenresList = styled.div`
transform: translateY(100%);
bottom:-1rem;
left:0;
z-index:100;
display: flex;
flex-wrap: wrap;
border-radius: 8px;
padding: 1rem;
max-width:900px;
min-width: 300px;
position:absolute;
white-space:pre-wrap;
background-color: white;
box-shadow: 0px 0px 10px rgba(255, 165, 0, .9);
display: none;

${GenreWord}:hover+&, &:hover{
    display: flex;
}
`
const GenresListTitle = styled.p`
margin: 0;
color:orange;
width:100%;
font-size:1rem;
font-weight: 600;
padding: 0 0 .5rem 1rem;
` 
const GenreElement = styled(Link)`
color:black;
font-weight: 500;
text-decoration: none;
font-size: 14px;
padding: .25rem 1rem;
border-radius: 4px;
transition:background-color .3s;
&:hover{
    color:white;
    background-color: orange;
}
`
const SearchAndUser = styled.div`
display:flex;
gap:2rem;
align-items: center;
`


const SearchBarContainer = styled.div`
height:100%;
width:250px;
position:relative;
`
export default function BigScreenNavbar(){
    const navigate = useNavigate();
    const [cookies,setCookies] = useCookies(["token"])

    const [showGenresList, setShowGenresList] = useState(true);
    const genres = useGetGenres();


    
    return ( 
        <Container>
            <ElementsContainer>
                <Logo style={{marginRight:"1rem"}} />
                <Element to={"/home"}>
                    <i className="fa-solid fa-house"/>
                    <span>Home</span>
                </Element>
                <GenreContainer>
                    <GenreWord>
                        <i className="fa-solid fa-layer-group"/>
                        <span>Genre</span> 
                    </GenreWord>
                    <GenresList $show={showGenresList}>
                        <GenresListTitle>Pick a Genre</GenresListTitle>
                        {genres.length>0 && genres.map((genre)=>(
                            <GenreElement key={genre.id} to={`/movies/?genre=${genre.name}`}>{genre.name}</GenreElement>
                        ))}
                    </GenresList>
                </GenreContainer>
                <Element to={'/movies'}>
                    <i className="fa-solid fa-video"/>
                    <span>Movies</span>
                </Element>
                <Element to={'/movies/top-imdb/'}>
                    <i className="fa-solid fa-star"/>
                    <span>Top IMDB</span>
                </Element>
            </ElementsContainer>
            <SearchAndUser>
                <SearchBarContainer>
                    <SearchBar />
                </SearchBarContainer>
                <UserProfileOrSignIn />
            </SearchAndUser>
        </Container>
    )
}
