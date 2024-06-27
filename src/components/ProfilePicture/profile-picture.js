import { useEffect } from "react"
import {useCookies} from "react-cookie"
import styled from "styled-components"

const Container = styled.div`
width:100%;
height:100%;
font-size:1.3rem;
`
const Profile = styled.div`
width:100%;
height :100%;
border-radius:50%;
`
const ProfileImage = styled.img`
width:100%;
height:100%;
border-radius:50%;
object-fit: cover;
`
const LetterPfp = styled.div`
color:white;
width:100%;
height:100%;
display:flex;
font-weight:900;
border-radius: 50%;
align-items:center;
justify-content:center;
background-color:orange;
`


export default function ProfilePicture({style,src=null}){
    const [cookies, setCookies] = useCookies()
 
    return (
        <Container style={style}>
            {(src && src!='null') || (cookies?.pfp && cookies.pfp != "null")?
                <Profile>
                    <ProfileImage alt="Logo" src={src && src != "null" ? src : cookies.pfp}/>
                </Profile> :
                <LetterPfp>
                    {cookies?.username[0].toUpperCase() || "G"}
                </LetterPfp>
            }
        </Container>
    )
}
