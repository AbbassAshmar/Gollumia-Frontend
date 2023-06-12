import { useState } from "react"
import NavButton from "../button"
import { Link } from "react-router-dom"
import "../moviesNavbar.css"


function SideNavbar(){

    const [displayGenres, setDisplayGenres] = useState(false)
    const [sideNavBackground, setSideNavBackground] = useState('hidden')
    const [displaySideNav, setDisplaySideNav] = useState(false)

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


return (
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
)

}


export default SideNavbar