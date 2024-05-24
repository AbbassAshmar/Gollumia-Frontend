import { useCookies } from "react-cookie";
import styled from "styled-components";
import ProfilePicture from "../../ProfilePicture/profile-picture";
import { Link, useNavigate } from "react-router-dom";

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
`
const SignInButton = styled(Link)`
color:orange;
border:none;
background:none;
`
const ActionsList = styled.div`
right:0;
top:140%;
z-index:100;
display: flex;
position: absolute;
border-radius:6px;
flex-direction: column;
background-color: white;
box-shadow: 0px 0px 10px rgba(255, 165, 0, .9);
`
const UserName = styled.div`
color:orange;
overflow: hidden;
max-width: 170px;
text-overflow: ellipsis;
white-space: nowrap;
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

export default function UserProfileOrSignIn(){
    const navigate = useNavigate();
    const [cookies, setCookies, removeCookie] = useCookies();

    async function signOut(){
        const request = await fetch(`${process.env.REACT_APP_API_URL}/logout/`,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Token '+ cookies.token
            }
        })

        if (request.status == 200){
            removeCookie("token",{path:'/'})
            navigate("/",{replace:true})
        }
    }

    if (cookies.token) return(
        <Container> 
            <ProfileContainer>
                <UserProfile>
                    <ProfilePicture />
                </UserProfile>
                <i className="fa-solid fa-angle-down"/>
            </ProfileContainer>
            <ActionsList>
                <UserName>huhiuhiuiuhihihuhihuewfhwiuhfiuw</UserName>
                <ActionLink to={`/user/${cookies.username}`}>
                    View Profile
                </ActionLink>
                <ActionLink to={`/movies/${cookies.id}/favorites`}>
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