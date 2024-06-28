import { useCookies } from "react-cookie";
import styled from "styled-components";
import ProfilePicture from "../../../ProfilePicture/profile-picture";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import useClickOutside from "../../../../hooks/use-click-outside";
import PopUp from "../../../PopUp/pop-up";

const Container = styled.div`
position:relative;
`
const ProfileContainer  = styled.div`
display: flex;
gap:.5rem;
color:white;
cursor: pointer;
align-items: center;
`
const UserProfile = styled.div`
width:36px;
height:36px;
@media screen and (max-width:800px){
    width:32px;
    height:32px;
}
`
const SignInButton = styled(Link)`
color:orange;
border:none;
background:none;
white-space: nowrap;
text-decoration: none;
font-size: 1.25rem;
font-weight: 600;

&:hover{
    color:darkorange;
}
`
const ActionsList = styled.div`
right:0;
z-index:100;
display:flex;
overflow: hidden;
border-radius:6px;
position: absolute;
top:calc(100% + 1rem);
flex-direction: column;
background-color: white;
transition: all .3s;
max-height: ${({$show})=> $show?"100vh":"0"};
box-shadow: 0px 0px 10px rgba(255, 165, 0, .9);

`
const UserName = styled.div`
color:orange;
overflow: hidden;
max-width: 170px;
white-space: nowrap;
min-height: 2.8rem;
text-overflow: ellipsis;
padding:.75rem 1.25rem .5rem 1.25rem;
`
const ActionLink = styled(Link)`
color:black;
padding:.5rem 1.25rem;
white-space: nowrap;
text-decoration: none;
text-align: start;
&:hover{
    background:orange;
    color:white;
}
`
const ActionButton = styled.button`
border:none;
color:black;
background:none;
text-align:start;
padding: .5rem 1.25rem;
padding-bottom: .75rem;
border-radius: 0 0 6px 6px;
&:hover{
    background:orange;
    color:white;
}
`
export function removeCookies(cookies, removeCookie){
    cookies.forEach((cookie)=> removeCookie(cookie, {path:"/"}))
}

export default function UserProfileOrSignIn(){
    const navigate = useNavigate();
    const [popUpMessage, setPopUpMessage] = useState({show:false, message:"", status:"success"});

    const [cookies, setCookies, removeCookie] = useCookies();
    const [showActionsList, setShowActionsList] = useState(false);

    const actionsListRef = useRef();
    const profileContainerRef = useRef();
    useClickOutside([actionsListRef,profileContainerRef], showActionsList, ()=>setShowActionsList(false));

    async function signOut(){
        const URL = `${process.env.REACT_APP_API_URL}/api/auth/logout`;
        const INIT = {
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Token '+ cookies.token
            }
        };

    
        try{
            const request = await fetch(URL ,INIT);
            if (request.status == 200 || request.status == 401){
                removeCookies(["token","username", "id", "email", "pfp"], removeCookie);
                navigate("/",{replace:true})
            }else{
                setPopUpMessage({show:true, message:"Try again later", status:"error"});
            }
        }catch(error){
            setPopUpMessage({show:true, message:"Service Unavailable", status:"error"});
        }
        
    }

    function handleProfileClick(){
        setShowActionsList(!showActionsList)
    }

    if (cookies.token) return(
        <Container> 
            <PopUp details={popUpMessage} setDetails={setPopUpMessage}/>
            <ProfileContainer ref={profileContainerRef} onClick={handleProfileClick}>
                <UserProfile>
                    <ProfilePicture />
                </UserProfile>
                <i className="fa-solid fa-angle-down"/>
            </ProfileContainer>
            <ActionsList ref={actionsListRef} $show={showActionsList}>
                <UserName>{cookies.username}</UserName>
                <ActionLink to={`/user/${cookies.username}`}>
                    View Profile
                </ActionLink>
                <ActionLink to={`/favorites`}>
                    My Favourites
                </ActionLink>
                <ActionButton onClick={signOut}>
                    Sign Out
                </ActionButton>
            </ActionsList>
        </Container>
    )

    return(
        <SignInButton to={"/login"}>
            Sign in
        </SignInButton>
    )
}