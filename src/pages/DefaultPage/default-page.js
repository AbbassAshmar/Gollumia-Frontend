import styled from "styled-components";
import Footer from "../../components/Footer/footer";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/MainNavbar/navbar";

const Container = styled.div`
width: 100%;
`

export default function DefaultPage({navbarStyle}){
    return (
        <Container>
            <Navbar style={navbarStyle}/>
            <Outlet />
            <Footer />
        </Container>
    )
}