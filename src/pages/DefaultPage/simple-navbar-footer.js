import styled from "styled-components";
import Footer from "../../components/Footer/footer";
import { Outlet } from "react-router-dom";
import SimplifiedNavbar from "../../components/SimplifiedNavbar/simplified-navbar";

const Container = styled.div`
width: 100%;
`
const NavbarContainer = styled.div`
top:0;
left:0;
width:100%;
z-index: 100;
position: absolute;
background-color: transparent;
@media screen and (max-width:1024px){
    position: static;
    background-color: black;
}
`

export default function SimpleNavbarFooterDefault(){
    return (
        <Container>
            <NavbarContainer>
                <SimplifiedNavbar/>
            </NavbarContainer>
            <Outlet />
            <Footer />
        </Container>
    )
}