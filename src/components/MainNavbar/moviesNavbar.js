import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components'
import { useCookies } from "react-cookie";
import './moviesNavbar.css'
import Pfp from "../ProfilePicture/pfp";
import { useNavigate } from "react-router-dom";
const Button = styled.button`
    transform:translateX(40px);
    margin:0;
    align-items:center;
    display:flex;
    max-width:7.2vw;
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

`
const navstyle = {
    color:"white",
    marginTop:"1rem"
}
function MoviesNav(props){
    const navigate = useNavigate();
    const [cookies,setCookies,removeCookie] = useCookies(["token"])
    const [showInfo, setshowInfo] = useState(null)
    function handleLogout(){
        fetch("http://127.0.0.1:8000/logout/",{
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Token '+ cookies.token[0]
        },})
        .then(resp =>{
            
            if (resp.ok == true){
                removeCookie("token",{path:'/'})
                navigate("/",{replace:true})
            }
        })
        .catch(error =>{console.log(error)})
    }
    return(
       
    <nav className="moviesPageNavTag">
        <ul>
            <li><Logo>AFLIX</Logo></li>
            <li><Link to={"/movies"}>Home</Link></li>
            <li>
                <Link id="genre">Genre</Link>
                <div className="drop-down-genres">
                    <Link>Action</Link>
                    <Link>Adventure</Link>
                    <Link>Crime</Link>
                    <Link>Action</Link>
                    <Link>Adventure</Link>
                    <Link>Crime</Link>
                    <Link>Action</Link>
                    <Link>Adventure</Link>
                    <Link>Crime</Link>
                    <Link>Action</Link>
                    <Link>Adventure</Link>
                    <Link>Crime</Link>
                    <Link>Adventure</Link>
                    <Link>Crime</Link>
                    <Link>Action</Link>
                    <Link>Adventure</Link>
                    <Link>Crime</Link>
                    <Link>Adventure</Link>
                    <Link>Crime</Link>
                    <Link>Action</Link>
                    <Link>Adventure</Link>
                    <Link>Crime</Link>
                    <Link>Action</Link>
                    <Link>Adventure</Link>
                    <Link>Crime</Link>
                    <div id="genre1"></div>
                </div>
            </li>
            <li><Link>Movies</Link></li>
            <li><Link>Top IMDB</Link></li>
        </ul>
        <div className="movies-navbar">
            <div className="search">
                <input className="searchInput" type="text" placeholder="search"></input>
                <i className="fa-solid fa-magnifying-glass"></i>        
            </div>
            <div>
                {cookies.token ?
                <div style={{position:'relative'}}>
                    <Button onClick={()=>{setshowInfo(!showInfo)}} id="signedin" color="warning">
                        <Pfp />
                        {showInfo ?<i className="fa-solid fa-sort-up"></i>:<i className="fa-solid fa-sort-down"></i>}
                    </Button>
                    {showInfo?
                    <Settings className="settingsButton">
                        <div className="username">&nbsp;{cookies.token[2]}</div>
                        <Link to={`/movies/user/${cookies.token[2]}`} style={{position:"relative" ,top:".25rem"}}>
                            <div>&nbsp;View Profile</div>
                        </Link>
                        <Link>
                            <div>&nbsp;My Favourites</div>
                        </Link>
                        <button onClick={handleLogout} className="signOutButton">
                            <div>&nbsp;Sign Out</div>
                        </button>
                    </Settings>:null}
                </div>
                : <Link to="/login" style={navstyle}>
                    <Button style={{cursor: 'pointer',color:'white',borderRadius:"2px"}}  id="signin" color="warning">Sign In</Button>
                </Link> 
                }
                
            </div>
        </div>   
    </nav>
    

    )
}

export default MoviesNav;