import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import Logo from "../Logo/logo";

const Container = styled.div`
display: flex;
width:100%;
padding:1rem 2rem;
align-items:center;
justify-content: space-between;
@media screen and (max-width:800px){
    padding : .75rem 1rem;
}
`

const SignInButton = styled(Link)`
color:orange;
border:none;
background:none;
white-space: nowrap;
text-decoration: none;
font-size: 1.25rem;
font-weight: 600;

&:hover{
    color:darkorange;
}
`

export default function SimplifiedNavbar({style}){
    return(
        <Container style={style}>
            <Logo />
            <SignInButton to={"/login"}>
                Sign in
            </SignInButton>
        </Container>
    )
}

