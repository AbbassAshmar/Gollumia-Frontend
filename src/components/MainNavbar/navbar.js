import styled from "styled-components";
import SmallScreenNavbar from "./small-screen-navbar";
import BigScreenNavbar from "./big-screen-navbar";


const Container = styled.nav`
width: 100%;
z-index:120;
background-color: black;
`

export default function Navbar({style}){
    return(
        <Container style={style}>
            <BigScreenNavbar />
            <SmallScreenNavbar />
        </Container>
    )
}