import styled from "styled-components";
import Logo from "../Logo/logo";
import UserProfileOrSignIn from "./UserProfileOrSignIn/user-profile-or-sign-in";
import { useState } from "react";

const Container = styled.div`
display: flex;
position:relative;
padding: 1rem 2rem;
align-items: center;
background-color: black;
justify-content: space-between;
@media screen and (min-width: 1024px) {
    display: none;
}


@media screen and (max-width:800px){
    padding : .5rem 1rem;
}
`

const BarsLogo = styled.div`
gap:1rem;

display: flex;
font-size: 1.25rem;
align-items: center;
`
const BarsIcon = styled.i`
color:white;
`

const SearchAndUser = styled.div`
gap:1rem;
display:flex;
align-items:center;
`
const SearchIcon = styled.i`
color:white;
font-size: 1.25rem;
`
const SearchBarConatiner = styled.div`
padding:0 1rem;
width:100%;
top:100%;
right:0;
position:absolute;
`
const SearchBarForm = styled.form`
width:100%;
position:relative;
`

const SearchIconOfSearchBar = styled.i`
top:50%;
right:.75rem;
color:orange;
font-size: 14px;
position: absolute;
transform:translateY(-50%);
`

const SearchBar = styled.input`
width:100%;
border: none;
outline:none;
color:white;
font-size:14px;
font-weight: 500;
border-radius:26px;
background-color: rgba(69,69,69,1);
padding:.5rem 2rem .5rem .75rem;
`
export default function SmallScreenNavbar(){
    const [showSearchBar, setShowSearchBar] = useState(true);
    
    function handleSearchIconClick(){
        setShowSearchBar(!showSearchBar);
    }

    return(
        <Container>
            <BarsLogo>
                <BarsIcon className="fa-solid fa-bars"/>
                <Logo />
            </BarsLogo>
            
            <SearchAndUser>
                <SearchIcon onClick={handleSearchIconClick} className="fa-solid fa-magnifying-glass"/>
                <UserProfileOrSignIn />
            </SearchAndUser>

            {/* {showSearchBar && (
                <SearchBarConatiner>
                    <SearchBarForm>
                        <SearchIconOfSearchBar className="fa-solid fa-magnifying-glass"/>
                        <SearchBar placeholder="search movies..." />
                    </SearchBarForm>
                </SearchBarConatiner>
            )}

            {searchResults.length > 0 && (
                <SearchResutlsList ref={searchResultsListRef}>
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
                </SearchResutlsList>
            )}
             */}
        </Container>
    )
}