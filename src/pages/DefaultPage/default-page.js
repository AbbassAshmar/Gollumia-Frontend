import styled from "styled-components";
import Footer from "../../components/Footer/footer";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/MainNavbar/navbar";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useState } from "react";
import { removeCookies } from "../../components/MainNavbar/components/UserProfileOrSignIn/user-profile-or-sign-in";

const Container = styled.div`
width: 100%;
overflow:${({$lock}) => $lock ? "hidden" : "auto"};
height:${({$lock}) => $lock ? "100vh" : "auto"};
min-height: 100vh;
background-color: black;
display: flex;
flex-direction: column;
`

export default function DefaultPage({navbarStyle}){
    const [lockBody, setLockBody] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(()=>{
        if(!cookies.token) 
        navigate('/login',{replace:true})
        else {
            fetchIsUserAuthenticated()
        }
    },[])

    async function fetchIsUserAuthenticated(){
        const URL = `${process.env.REACT_APP_API_URL}/api/auth/check`;
        const INIT = {
            method:"GET",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Token '+ cookies.token
            }
        };

        try {
            const request = await fetch(URL ,INIT);
            if (request.status != 200){
                handleUnauthenticated()
            }
        }catch(e){
            handleUnauthenticated()
        }
    }

    function handleUnauthenticated() {
        removeCookies(["token", "username", "id", "email", "pfp"], removeCookie);
        navigate("/login", { replace: true });
    }


    return (
        <Container $lock={lockBody}>
            <Navbar setLockBody={setLockBody} style={navbarStyle}/>
            <div style={{flex:"1"}}>
                <Outlet />
            </div>
            <Footer />
        </Container>
    )
}