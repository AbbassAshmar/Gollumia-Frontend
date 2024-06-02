import styled from "styled-components"
import InputField from "../../../components/Input/input";
import SimplifiedNavbar from "../../../components/SimplifiedNavbar/simplified-navbar";
import wp2 from "../../../photos/wp2.jpg";
import { Link } from "react-router-dom";

const AboveTheFolds = styled.div`
width:100%;
min-height: 100vh;
background-image: url(${wp2});
display: flex;
flex-direction: column;
background-size: contain;
position:relative;
z-index:1;
&::before{
    content:"";
    position: absolute;
    width: 100%;
    height:100%;
    z-index: -1;
    background:radial-gradient(circle, rgba(0,0,0,.8) 13%, rgba(0,0,0,0) 70%, rgba(0,0,0,1) 100%);   
    opacity: 1;
}
`

const ContentContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
position: relative;
height: 100%;
width: 100%;
flex: 1;
`
const Content = styled.div`
position: relative;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
gap:2rem;
&::before{
    content:"";
    position: absolute;
    background: orange;
    opacity: 0;
    rotate: 10deg;
    width: 90%;
    height:300px;
    border-radius: 50%;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%); /* Center the element horizontally and vertically */
    filter: blur(100px);
    z-index: 9;
}
`
const TitleButton = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
position: relative;
height: 100%;
z-index:10;
gap:2rem;
`
const Title = styled.h2`
font-size:3rem;
letter-spacing: .02;
text-align: center;
color:white;
font-weight: 600;
text-shadow: 0px 0px 10px rgba(0,0,0,0.5);
`
const JoinUs = styled(Link)`
padding:.5rem 1rem;
font-size:1.3rem;
background:orange;
border-radius:4px;
border:none;
font-weight: 600;
text-decoration: none;
color:white;
box-shadow: 0px 0px 8px black;
&:hover{
    background:darkorange;
    color:white;
}
`

export default function Section1(){
    return(

        <AboveTheFolds>
            <SimplifiedNavbar />
            <ContentContainer>
                <Content>
                    <TitleButton>
                        <Title>
                            WHERE <span style={{color:"orange"}}>FILMERS</span> ARE BORN<br/>
                            Get Into the paradise of movies
                        </Title>
                        <JoinUs to="/login">Join Us Now</JoinUs>
                    </TitleButton> 
                </Content>
            </ContentContainer>
        </AboveTheFolds>

    )
}