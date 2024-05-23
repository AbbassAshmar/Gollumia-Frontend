import styled from "styled-components";
import SmallScreenNavbar from "./small-screen-navbar";
import BigScreenNavbar from "./big-screen-navbar";


const Container = styled.nav`

`

export default function Navbar(){
    return(
        <Container>
            <BigScreenNavbar />
            <SmallScreenNavbar />
        </Container>
    )
}