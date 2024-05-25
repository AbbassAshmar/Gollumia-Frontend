import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import UserProfileOrSignIn from "./UserProfileOrSignIn/user-profile-or-sign-in";
import Logo from "../Logo/logo";
import useClickOutside from "../../hooks/use-click-outside";
import SearchBar from "./components/SearchBar/search-bar";
import useSearch from "./hooks/use-search";

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
`
const GenreElement = styled(Link)`
color:black;
font-weight: 300;
text-decoration: none;
font-size: 14px;
`
const SearchAndUser = styled.div`
display:flex;
gap:2rem;
align-items: center;
`
const SearchContainer = styled.div`
position:relative;
`

const SearchBarContainer = styled.div`
height:100%;
width:250px;
`
// const SearchIcon = styled.i`
// top:50%;
// right:.75rem;
// color:orange;
// font-size: 14px;
// position: absolute;
// transform:translateY(-50%);
// `
// const SearchBar = styled.input`
// border: none;
// outline:none;
// color:white;
// font-size:14px;
// font-weight: 500;
// border-radius:26px;
// background-color: rgba(69,69,69,1);
// padding:.5rem 2rem .5rem .75rem;
// `
const SearchResultsList = styled.div`
top:calc(100% + 1rem);
width: 100%;
z-index: 100;
display: flex;
position:absolute;
flex-direction:column;
background-color: rgba(69,69,69,1);
`
const MovieTitle = styled.p`
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
color:white;
font-weight: 500;
margin:0;
font-size: 14px;
`
const SearchedMovie = styled(Link)`
width: 100%;
gap: 0.75rem;
display: flex;
padding: .5rem .75rem;
align-items: flex-start;
text-decoration: none;
&:hover{
    background:rgba(80,80,80,1);
}
&:hover ${MovieTitle}{
    color:orange;
}
`
const MoviePosterContainer = styled.div`
aspect-ratio: 1/1.2;
flex:1.5;
`
const MoviePoster = styled.img`
width:100%;
height:100%;
object-fit: cover;
`
const MovieTextContainer = styled.div`
flex:4;
gap:.25rem;
display: flex;
flex-direction: column;
justify-content: flex-start;
`
const MovieYear = styled.p`
font-weight: 600;
color:grey;
margin:0;
font-size: 12px;
`
export default function BigScreenNavbar(){
    const navigate = useNavigate();
    const [cookies,setCookies] = useCookies(["token"])

    const [genres, setGenres] = useState([{name:'shadow'}, {name:'shadow'},{name:'shadow'},{name:'shadow'},{name:'shadow'},{name:'shadow'},{name:'shadow'},{name:'shadow'},{name:'shadow'},{name:'shadow'},{name:'shadow'},])
    const [searchInputValue, setSearchInputValue] = useState("")
    
    const [showGenresList, setShowGenresList] = useState(true);
    const [searchResults, setSearchResults] = useState([]);

    const searchInputRef = useRef();
    const searchResultsListRef = useRef();
    useClickOutside([searchInputRef,searchResultsListRef],searchResults.length,handleSearchInputBlur)

    const {handleSearchInputChange,handleSearchFormSubmit} = useSearch({setSearchInputValue,setSearchResults});

    useEffect(()=>{
        // requestGenres()
    },[])


    function handleSearchInputBlur(){
        setSearchResults([])
    }

    // async function requestMoviesOnSeachInputChange(title){
    //     let url = `/api/movies/?title=${title}&start=0&limit=5`
    //     const request = await fetch(`${process.env.REACT_APP_API_URL}${url}`);
    //     const response = await request.json();
    //     if (request?.status == 200){
    //         setSearchResults(response.data.movies)
    //     }
    // }
    
    // function handleSearchInputChange(e){
    //     let search_input = e.currentTarget.value
    //     setSearchInputValue(search_input)

    //     search_input = search_input.trim()
    //     if(search_input.length>=1){
    //         requestMoviesOnSeachInputChange(search_input)
    //     }else{
    //         setSearchResults([])
    //     }
    // }

    // function handleSearchFormSubmit(e){
    //     e.preventDefault()
    //     let data = new FormData(e.currentTarget);
    //     let value= data.get('search-input').trim();
    //     navigate(`/movies/?title=${value}`)
    // }

    async function requestGenres(){
        const URL = `${process.env.REACT_APP_API_URL}/api/genres/`;
        const request = await fetch(URL);
        const genre_list = await request.json();

        if (request?.status == 200){
            setGenres(genre_list.data.genres)
        }
    }
    
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
                <SearchContainer>
                    
                    <SearchBarContainer>
                        <SearchBar 
                        handleSearchInputChange={handleSearchInputChange} 
                        handleSearchFormSubmit={handleSearchFormSubmit} 
                        searchInputValue={searchInputValue} 
                        searchInputRef={searchInputRef}/>
                    </SearchBarContainer>
                    

                    {/* <SearchBarContainer onSubmit={handleSearchFormSubmit}>
                        <SearchIcon className="fa-solid fa-magnifying-glass"/>
                        <SearchBar ref={searchInputRef} value={searchInputValue} onChange={handleSearchInputChange} placeholder="search..." type="text" />
                    </SearchBarContainer> */}

                    {searchResults.length > 0 && (
                        <SearchResultsList ref={searchResultsListRef}>
                            {searchResults.map(movie=>(
                                <SearchedMovie to={`/movies/${movie.id}`} key={movie.id}>
                                    <MoviePosterContainer>
                                        <MoviePoster src={movie.poster} alt={movie.title + " poster"}/>
                                    </MoviePosterContainer>
                                    <MovieTextContainer>
                                        <MovieTitle>{movie.title}</MovieTitle>
                                        <MovieYear>{(new Date(movie.released).getFullYear())}</MovieYear>
                                    </MovieTextContainer>
                                </SearchedMovie>
                            ))}
                        </SearchResultsList>
                    )}
                </SearchContainer>
                <UserProfileOrSignIn />
            </SearchAndUser>
        </Container>
    )
}
