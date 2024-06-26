import styled from "styled-components";
import Logo from "../Logo/logo";
import { useState } from "react";
import SearchBar from "./components/SearchBar/search-bar";
import SideNavigation from "./components/SideNavigation/side-navigation";
import UserProfileOrSignIn from "./components/UserProfileOrSignIn/user-profile-or-sign-in";

const Container = styled.div`
z-index: 120;
display: flex;
position:relative;
padding: 1rem 2rem;
align-items: center;
justify-content: space-between;
@media screen and (min-width: 1025px) {
    display: none;
}
@media screen and (max-width:800px){
    padding : .75rem 1rem;
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
z-index: 100;
`


export default function SmallScreenNavbar({setLockBody}){
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [showSideNavigation, setShowSideNavigation] = useState(false);

    function handleSearchIconClick(){
        setShowSearchBar(!showSearchBar);
    }

    function handleBarsIconClick(){
        setShowSideNavigation(true);
        setLockBody(true);
    }

    return(
        <Container>
            <SideNavigation setLockBody={setLockBody} show={showSideNavigation} setShow={setShowSideNavigation} />
            <BarsLogo>
                <BarsIcon onClick={handleBarsIconClick} className="fa-solid fa-bars"/>
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