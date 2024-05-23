import { useCookies } from "react-cookie";
import styled from "styled-components";
import ProfilePicture from "../../ProfilePicture/profile-picture";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
display: flex;
gap: 0.5rem;
align-items: center;
position:relative;
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
position: absolute;
display: flex;
flex-direction: column;
`
const ActionLink = styled(Link)`
padding:.5rem 1rem;
`
const ActionButton = styled.button`
border:none;
background:none;
padding: 0.5rem 1rem;
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
            <UserProfile>
                <ProfilePicture />
            </UserProfile>
            <i className="fa-solid fa-angle-down"/>

            <ActionsList>
                <ActionLink to={`/user/${cookies.username}`}>
                    View Profile
                </ActionLink>
                <ActionLink to={`/movies/${cookies.id}/favorites`}>
                    My Favourites
                </ActionLink>
                <ActionButton onClick={signOut}>
                    <div>&nbsp;Sign Out</div>
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