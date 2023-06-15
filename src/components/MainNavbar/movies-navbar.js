import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components'
import { useCookies } from "react-cookie";
import './moviesNavbar.css'
import { useNavigate } from "react-router-dom";
import SearchMoviesNav from "../SearchMoviesNav/search-movies-nav";
import ProfileDropDown from "./ProfileDropDown/profile-drop-down";
import SideNavbar from "./SideNavbar/side-navbar";
import DefaultSearchBox from "./DefaultSearchBox/default-search-box";
import SearchBox from "./SearchBox/search-box"


const Button = styled.button`
    margin:0;
    align-items:center;
    display:flex;
    max-width:60px;
    cursor:pointer;
    color:white;
    overflow:hidden;
    gap:5px;
`
export const Logo = styled.h1`
    font-family: 'Kanit', sans-serif;
    color:orange;
    font-weight:700;
    font-size:2.3rem;
    margin:0 0 0 0;
`

function MoviesNav(){
    const navigate = useNavigate();
    const [cookies,setCookies,removeCookie] = useCookies(["token"])
    const [SearchIconColor ,setSearchIconColor] = useState("black")
    const [displaySearchBar,setDisplaySearchBar] = useState('none')
    const [genres, setGenres] = useState([])
    const [searchedMovies, setSearchedMovies] = useState([])
    const [searchInputValue, setSearchInputValue] = useState(0)
    
    function detectInputBlur(){
        setSearchedMovies([])
    }
    async function requestMoviesOnSeachInputChange(title){
        const request = await fetch(`http://127.0.0.1:8000/api/movies/?title=${title}&start=0&limit=5`);
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
            setGenres(genre_list)
        }
    }

    useEffect(()=>{
        requestGenres()
    },[])

    const navstyle = {
        color:"white",
        marginTop:"1rem"
    }
    

    const handleSearchIconClick = (e)=>{
        if (SearchIconColor === "black"){
            setSearchIconColor("rgba(255, 255, 255,.4)")
            setDisplaySearchBar("flex")
        }else{
            setSearchIconColor("black")
            setDisplaySearchBar("none")
        }
    }


    


    return(
    <nav className="moviesPageNavTag">
        <SideNavbar genres={genres} />
        
        <ul className="navbar-elements-list">
            <li><Logo>AFLIX</Logo></li>
            <li><Link to={"/home"} style={{textDecoration:"none"}}>Home</Link></li>
            <li>
                <Link id="genre" style={{textDecoration:"none"}}>Genre</Link>
                <div className="drop-down-genres">
                    {genres.map((genre)=>{
                        return <Link key={genre.id} to={`/movies/?genre=${genre.name}`}>{genre.name}</Link>
                    })}
                </div>
            </li>
            <li><Link  to={'/movies'} style={{textDecoration:"none"}}>Movies</Link></li>
            <li><Link to={'/movies/top-imdb/'} style={{textDecoration:"none"}}>Top IMDB</Link></li>
        </ul>
        <div className="movies-navbar">
            <DefaultSearchBox detectInputBlur={detectInputBlur} handleSearchChange={handleSearchChange} handleSearchSubmit={handleSearchSubmit}  setSearchedMovies={setSearchedMovies}/>
            
            <div className="search-simplified">
                <i style={{background:SearchIconColor}} className="fa-solid fa-magnifying-glass" onClick={handleSearchIconClick}></i>        
            </div>

            <div>
                {cookies.token ?
                <ProfileDropDown />
                :
                
                <Link to="/login" style={navstyle}>
                    <Button style={{cursor: 'pointer',color:'white',borderRadius:"2px"}}  id="signin" color="warning">Sign In</Button>
                </Link> 
                }
            </div>
            <SearchMoviesNav inputLength={searchInputValue} movies={searchedMovies}/>
        </div>

        <SearchBox displaySearchBar={displaySearchBar} handleSearchSubmit={handleSearchSubmit} handleSearchChange={handleSearchChange}/>

    </nav>
    

    )
}

export default MoviesNav;