import styled from "styled-components";
import Footer from "../../components/Footer/footer";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/MainNavbar/navbar";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useState } from "react";

const Container = styled.div`
width: 100%;
overflow:${({$lock}) => $lock ? "hidden" : "auto"};
height:${({$lock}) => $lock ? "100vh" : "auto"};
`

export default function DefaultPage({navbarStyle}){
    const [lockBody, setLockBody] = useState(false);
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
        <Container $lock={lockBody}>
            <Navbar setLockBody={setLockBody} style={navbarStyle}/>
            <Outlet />
            <Footer />
        </Container>
    )
}