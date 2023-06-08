import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components'
import { useCookies } from "react-cookie";
import './moviesNavbar.css'
import Pfp from "../ProfilePicture/pfp";
import { useNavigate } from "react-router-dom";
import NavButton from "./button";

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
const Logo = styled.h1`
    font-family: 'Kanit', sans-serif;
    color:orange;
    font-weight:700;
    font-size:2.3rem;
    margin:0 0 0 0;
`
const Settings = styled.div`
    height :320%;
    max-height:400%;
    width:200%;
    background:black;
    position:absolute;
    z-index:2;
    right:-25%;
    top:130%;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:stretch;
    box-shadow: 0px 0px 6px orange;
    border-radius:10px;
    overflow:hidden;
    transition: max-height .5s;
    @media screen and (max-width:900px){
        right:-0%;
        width:300%;
}

`


const SearchBox = styled.div`
display:none;
@media screen and (max-width:900px){
    display:${(displaySearchBar)=>displaySearchBar};
}
`

function MoviesNav(props){
    const navigate = useNavigate();
    const [cookies,setCookies,removeCookie] = useCookies(["token"])
    const [showInfo, setshowInfo] = useState(false)
    const [SearchIconColor ,setSearchIconColor] = useState("black")
    const [displaySearchBar,setDisplaySearchBar] = useState('none')
    const [displayGenres, setDisplayGenres] = useState(false)
    const [sideNavBackground, setSideNavBackground] = useState('hidden')
    const [displaySideNav, setDisplaySideNav] = useState(false)
    const [genres, setGenres] = useState([])
    
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
    
    function handleLogout(){
        fetch("http://127.0.0.1:8000/logout/",{
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Token '+ cookies.token
        },})
        .then(resp =>{
            if (resp.ok == true){
                removeCookie("token",{path:'/'})
                navigate("/",{replace:true})
            }
        })
        .catch(error =>{console.log(error)})
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


    const handleDisplaySideNav = ()=>{
        // make both background and side nav appear
        if (sideNavBackground === "hidden"){
            setSideNavBackground("visible")
            setDisplaySideNav(true)
        }else{
            // make only side nav close, then invoke handleSideNavClose function when closed
            setDisplaySideNav(false)
        }
    }


    const handleSideNavClose =(e)=>{
        // prevent child elements to invoke the event
        if(e.target == e.currentTarget){
            // matrix(1, 0, 0, 1, 0, 0) is the value of transform : translateX(-100%)
            if(getComputedStyle(e.target).getPropertyValue("transform")!="matrix(1, 0, 0, 1, 0, 0)"){
                setSideNavBackground("hidden")
            }
        }
    }

    return(
    <nav className="moviesPageNavTag">
        <div style={{zIndex:`${(sideNavBackground ==="hidden")?"-1":"1000"}`}} onClick={handleSideNavClose} className="side-navbar-wrapper">
            <div style={{transform:`translateX(${(displaySideNav===false)?"-100%":"0"})`}} onTransitionEnd={handleSideNavClose}  className="side-navbar-container">
                <div className="side-navbar-content">
                    <NavButton onClick={handleDisplaySideNav}></NavButton>
                    <Link to={"/home"} style={{textDecoration:"none"}}>Home</Link>
                    <div className="side-navbar-genre-container">
                        <div className="side-navbar-genre">
                            <p>Genre</p>
                            <div onClick={()=>{setDisplayGenres(!displayGenres)}}>{displayGenres?'-':'+'}</div>
                        </div>
                        <div style={{maxHeight:`${displayGenres?'20rem':'0'}`}} className="side-navbar-genres"> 
                            {genres.map((genre)=>{
                                return <Link key={genre.id} to={`/movies/?genre=${genre.name}`}>{genre.name}</Link>
                            })}
                        </div>
                    </div>
                    <Link to={'/movies'} style={{textDecoration:"none"}}>Movies</Link>
                    <Link to={'/movies/top-imdb/'} style={{textDecoration:"none"}}>Top IMDB</Link>
                </div>
            </div>
        </div>
        <div className="navbar-elements-simplified">
            <i className="fa-solid fa-bars" style={{cursor:"pointer"}} onClick={handleDisplaySideNav}></i>
            <Logo>AFLIX</Logo>
        </div>
        
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
            <div className="search">
                <input className="searchInput" type="text" placeholder="search"></input>
                <i className="fa-solid fa-magnifying-glass"></i>        
            </div>
            <div className="search-simplified">
                <i style={{background:SearchIconColor}} className="fa-solid fa-magnifying-glass" onClick={handleSearchIconClick}></i>        
            </div>
            <div>
                {cookies.token ?
                <div style={{position:'relative'}}>
                    <Button onClick={()=>{setshowInfo(!showInfo)}} id="signedin" color="warning">
                        <Pfp/>
                        {/* arrow icon up or down */}
                        {showInfo ?<i className="fa-solid fa-sort-up"></i>:<i className="fa-solid fa-sort-down"></i>}
                    </Button>
                    
                    <Settings className="settingsButton" style={{maxHeight:`${showInfo?"300%":"0"}`}}>
                        <div className="username">&nbsp;{cookies.username}</div>
                        <Link to={`/user/${cookies.username}`} style={{textDecoration:"none",position:"relative" ,top:".25rem"}}>
                            <div>&nbsp;View Profile</div>
                        </Link>
                        <Link style={{textDecoration:"none"}}>
                            <div>&nbsp;My Favourites</div>
                        </Link>
                        <button onClick={handleLogout} className="signOutButton">
                            <div>&nbsp;Sign Out</div>
                        </button>
                    </Settings>
                </div>
                :<Link to="/login" style={navstyle}>
                    <Button style={{cursor: 'pointer',color:'white',borderRadius:"2px"}}  id="signin" color="warning">Sign In</Button>
                </Link> 
                }
            </div>
        </div>
        <SearchBox displaySearchBar={displaySearchBar} className="search-box-simplified-container">
            <div className="search-box-simplified-content">
                <input
                    type="text"
                    placeholder="Searching..."
                />
                <i className="fa-solid fa-magnifying-glass"></i> 
            </div>
        </SearchBox>   
    </nav>
    

    )
}

export default MoviesNav;