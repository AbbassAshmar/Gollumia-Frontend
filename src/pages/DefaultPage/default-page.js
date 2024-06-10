import styled from "styled-components";
import Footer from "../../components/Footer/footer";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/MainNavbar/navbar";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

const Container = styled.div`
width: 100%;
`

export default function DefaultPage({navbarStyle}){
    const [cookies, setCookies] = useCookies();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(()=>{
        if(!cookies.token) 
        navigate('/login',{replace:true})
    },[])

    return (
        <Container>
            <Navbar style={navbarStyle}/>
            <Outlet />
            <Footer />
        </Container>
    )
}