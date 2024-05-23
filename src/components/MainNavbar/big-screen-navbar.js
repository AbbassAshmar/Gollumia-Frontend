import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import UserProfileOrSignIn from "./UserProfileOrSignIn/user-profile-or-sign-in";
import Logo from "../Logo/logo";

const Container = styled.div`
@media screen and (max-width: 1024px) {
    display: none;
}
`
const ElementsContainer = styled.div`
gap:1rem;
display: flex;
align-items: center;
`
const Element = styled(Link)`
margin:0;
color:white;
gap: 0.5rem;
display: flex;
align-items: center;
`

const GenreElement = styled.div`

`
const Genre = styled.div`

`
const GenresList = styled.div`
position:absolute;
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

    const [genres, setGenres] = useState([])
    const [searchedMovies, setSearchedMovies] = useState([])
    const [searchInputValue, setSearchInputValue] = useState(0)
    
    useEffect(()=>{
        requestGenres()
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
                    <p>Home</p>
                </Element>
                
                <GenreElement>
                    <Genre>Genre</Genre>
                    <GenresList>
                        {genres.length>0 && genres.map((genre)=>(
                            <Link key={genre.id} to={`/movies/?genre=${genre.name}`}>{genre.name}</Link>
                        ))}
                    </GenresList>
                </GenreElement>
                
                <Element to={'/movies'}>
                    <i className="fa-solid fa-video"/>
                    <p>Movies</p>
                </Element>
                <Element to={'/movies/top-imdb/'}>
                    <i className="fa-solid fa-star"/>
                    <p>Top IMDB</p>
                </Element>
            </ElementsContainer>

            <SearchAndUser>
                <UserProfileOrSignIn />
            </SearchAndUser>
        </Container>
    )
}