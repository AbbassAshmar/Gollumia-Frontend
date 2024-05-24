import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import UserProfileOrSignIn from "./UserProfileOrSignIn/user-profile-or-sign-in";
import Logo from "../Logo/logo";

const Container = styled.div`
display: flex;
width:100%;
padding:1rem 2rem;
justify-content: space-between;
align-items:center;
background:black;
@media screen and (max-width: 1024px) {
    display: none;
}
`
const ElementsContainer = styled.div`
gap:2rem;
display: flex;
align-items: center;
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
`
const GenreContainer =styled.div`
position:relative;
`

const GenreWord = styled.div`
margin:0;
color:white;
gap: 0.5rem;
padding:1rem;
display: flex;
cursor:pointer;
align-items: center;
display: inline-block;
`
const GenresList = styled.div`
top:110%;
left:0;
gap: 1.25rem;
z-index:100;
display: flex;
flex-wrap: wrap;
border-radius: 8px;
padding: 1.25rem;
max-width:800px;
min-width: 240px;
position:absolute;
white-space:pre-wrap;
background-color: white;
box-shadow: 0px 0px 10px rgba(255, 165, 0, .9);
`
const GenresListTitle = styled.p`
margin: 0;
color:orange;
width:100%;
font-size:1rem;
font-weight: 600;
`
const GenreElement = styled(Link)`
color:black;
font-weight: 300;
text-decoration: none;
font-size: 14px;
`
const SearchAndUser = styled.div`
display:flex;
gap:1rem;
align-items: center;
`

export default function BigScreenNavbar(){
    const navigate = useNavigate();
    const [cookies,setCookies] = useCookies(["token"])

    const [SearchIconColor ,setSearchIconColor] = useState("black")
    const [displaySearchBar,setDisplaySearchBar] = useState('none')

    const [genres, setGenres] = useState([{name:'shadow'}, {name:'shadow'},{name:'shadow'},{name:'shadow'},{name:'shadow'},{name:'shadow'},{name:'shadow'},{name:'shadow'},{name:'shadow'},{name:'shadow'},{name:'shadow'},])
    const [searchedMovies, setSearchedMovies] = useState([])
    const [searchInputValue, setSearchInputValue] = useState(0)
    
    const [showGenresList, setShowGenresList] = useState(true);

    useEffect(()=>{
        // requestGenres()
    },[])


    function detectInputBlur(){
        setSearchedMovies([])
    }

    
    async function requestMoviesOnSeachInputChange(title){
        let url = `/api/movies?title=${title}&start=0&limit=5`
        const request = await fetch(`${process.env.REACT_APP_API_URL}${url}`);
        const response = await request.json();
        if (request.status == 200){
            setSearchedMovies(response['movies'])
        }
    }
    
    function handleSearchChange(e){
        e.preventDefault()
        let search_input = e.currentTarget.value
        setSearchInputValue(search_input.length)
        if(search_input.length>=1){
            requestMoviesOnSeachInputChange(search_input)
        }else{
            setSearchedMovies([])
        }
    }

    function handleSearchSubmit(e){
        e.preventDefault()
        let data = new FormData(e.currentTarget);
        let value= data.get('search-input');
        navigate(`/movies/?title=${value}`)
    }


    async function requestGenres(){
        const request = await fetch('http://127.0.0.1:8000/api/genres/');
        const genre_list = await request.json();
        if (request.status == 200){
            setGenres(genre_list.data.genres)
        }
    }
    
    

    return ( 
        <Container>
            <ElementsContainer>
                <Logo />
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
                <UserProfileOrSignIn />
            </SearchAndUser>
        </Container>
    )
}