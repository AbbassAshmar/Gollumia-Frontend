import {useCookies} from "react-cookie"
import styled from "styled-components"

const Container = styled.div`
width:100%;
height:100%;
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
object-fit: contain;
`
const LetterPfp = styled.div`
width:100%;
height:100%;
display:flex;
font-weight:900;
font-size:1.3rem;
border-radius: 50%;
align-items:center;
justify-content:center;
background-color:orange;
`


export default function ProfilePicture({style}){
    const [cookies, setCookies] = useCookies(["pfp"])
  
    return (
        <Container style={style}>
            {cookies?.pfp && cookies.pfp != "null"?
                <Profile><ProfileImage src={cookies.pfp}/></Profile> :
                <LetterPfp>
                    {cookies?.username[0].toUpperCase() || "G"}
                </LetterPfp>
            }
        </Container>
    )
}
