import { useCookies } from "react-cookie"
import { useRef, useState,useEffect } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import "../moviesNavbar.css"
import ProfilePicture from "../../ProfilePicture/profile-picture";
import { useNavigate } from "react-router-dom"

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

function ProfileDropDown(){
    const [cookies,setCookies,removeCookie] = useCookies(["token"])
    const [ExpandInfo, setExpandInfo] = useState(false)
    const navigate = useNavigate();
    const ref = useRef(null)
    const ref2 = useRef(null)

        useEffect(() => {
            console.log(ExpandInfo)
            if (ExpandInfo){
                function handleClickOutside(event) {
                    if (ref.current && !ref.current.contains(event.target) && !ref2.current.contains(event.target)) {
                        setExpandInfo(false)
                    }
                }
                document.addEventListener("mousedown", handleClickOutside);
            }
        }, [ExpandInfo]);
  


    async function handleLogout(){
        const request = await fetch("http://127.0.0.1:8000/logout/",{
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Token '+ cookies.token
        },})
        if (request.status == 200){
            removeCookie("token",{path:'/'})
            navigate("/",{replace:true})
        }
    }

    return (
        <div style={{position:'relative'}}>
            <Button ref={ref2} onClick={()=>{setExpandInfo(!ExpandInfo)}} id="signedin" color="warning">
                <ProfilePicture/>
                {ExpandInfo ?<i className="fa-solid fa-sort-up"></i>:<i className="fa-solid fa-sort-down"></i>}
            </Button>
            
            <Settings ref={ref} className="settingsButton" style={{maxHeight:`${ExpandInfo?"300%":"0"}`}}>
                <div className="username">&nbsp;{cookies.username}</div>
                <Link to={`/user/${cookies.username}`} style={{textDecoration:"none",position:"relative" ,top:".25rem"}}>
                    <div>&nbsp;View Profile</div>
                </Link>
                <Link to={`/movies/${cookies.id}/favorites`} style={{textDecoration:"none"}}>
                    <div>&nbsp;My Favourites</div>
                </Link>
                <button onClick={handleLogout} className="signOutButton">
                    <div>&nbsp;Sign Out</div>
                </button>
            </Settings>
        </div>
    )
}

export default ProfileDropDown;