import styled from "styled-components";

const Container = styled.form`
width:100%;
position:relative;
height:100%;
`
const SearchIcon = styled.i`
top:50%;
right:.75rem;
color:orange;
font-size: 14px;
position: absolute;
transform:translateY(-50%);
`
const SearchInput = styled.input`
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

export default function SearchBar({searchInputRef, searchInputValue,handleSearchFormSubmit,handleSearchInputChange}){

    
    return(
        <Container onSubmit={handleSearchFormSubmit}>
            <SearchIcon className="fa-solid fa-magnifying-glass"/>
            <SearchInput 
            ref={searchInputRef} 
            value={searchInputValue} 
            onChange={handleSearchInputChange} 
            placeholder="search..." type="text" />
        </Container>
    )
}