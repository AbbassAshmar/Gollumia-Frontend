import styled from "styled-components";
import Logo from "../Logo/logo";
import UserProfileOrSignIn from "./UserProfileOrSignIn/user-profile-or-sign-in";
import { useState } from "react";
import SearchBar from "./components/SearchBar/search-bar";

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
const SearchBarContainer = styled.div`
top:100%;
right:0;
position: absolute;
width:calc(100% - 2rem);
margin: 0 1rem;
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

            {showSearchBar && (
                <SearchBarContainer>
                    <SearchBar />
                </SearchBarContainer>
            )}

            
        </Container>
    )
}