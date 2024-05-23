import styled from "styled-components";
import Footer from "../../components/Footer/footer";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/MainNavbar/navbar";

const Container = styled.div`

`

export default function DefaultPage(){
    return (
        <Container>
            <Navbar />
            
            <Outlet />
            <Footer />
        </Container>
    )
}