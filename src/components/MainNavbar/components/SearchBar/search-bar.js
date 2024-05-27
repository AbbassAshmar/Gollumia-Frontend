import styled from "styled-components";
import SearchResultsList from "../SearchResultsList/search-results-list";
import { useNavigate } from "react-router-dom";
import useClickOutside from "../../../../hooks/use-click-outside";
import { useState } from "react";
import { useRef } from "react";

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

export default function SearchBar(){
    const navigate = useNavigate();
    const searchInputRef = useRef();
    const searchResultsListRef = useRef();

    const [searchResults, setSearchResults] = useState([]);
    const [searchInputValue, setSearchInputValue] = useState("")

    useClickOutside([searchInputRef,searchResultsListRef],searchResults.length,handleSearchInputBlur)

    function handleSearchInputBlur(){
        setSearchResults([])
    }

    async function requestMoviesOnSeachInputChange(title){
        let url = `/api/movies/?title=${title}&start=0&limit=5`
        const request = await fetch(`${process.env.REACT_APP_API_URL}${url}`);
        const response = await request.json();

        if (request?.status == 200){
            setSearchResults(response.data.movies)
        }
    }
    
    function handleSearchInputChange(e){
        let search_input = e.currentTarget.value
        setSearchInputValue(search_input)

        search_input = search_input.trim()
        if(search_input.length>=1){
            requestMoviesOnSeachInputChange(search_input)
        }else{
            setSearchResults([])
        }
    }

    function handleSearchFormSubmit(e){
        e.preventDefault()
        let data = new FormData(e.currentTarget);
        let value= data.get('search-input').trim();
        navigate(`/movies/?title=${value}`)
    }
    return(
        <Container onSubmit={handleSearchFormSubmit}>
            <SearchIcon className="fa-solid fa-magnifying-glass"/>
            <SearchInput 
            ref={searchInputRef} 
            value={searchInputValue} 
            onChange={handleSearchInputChange} 
            placeholder="search..." type="text" name="search-input" />
            <SearchResultsList 
            searchResults={searchResults}
            searchResultsListRef={searchResultsListRef}/>
        </Container>
    )
}