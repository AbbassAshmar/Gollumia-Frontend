import React from "react";
import { Button } from "reactstrap";
import { Link} from "react-router-dom";
import styled from "styled-components";

const Logo = styled.h1`
    font-family: 'Kanit', sans-serif;
    color:orange;
    font-weight:700;
    margin-left:2rem;
    margin-top: 1rem;
`
function Navbar(){

const navstyle = {
    color:"white",
    marginTop:"1rem"
};
    return(
        <nav>
            <Logo>AFLIX</Logo>
            <Link to="/login" style={navstyle}>
                <Button style={{cursor: 'pointer',color:'white',borderRadius:"2px"}}  id="signin" color="warning">Sign in</Button>
            </Link> 
        </nav>
    )
}

export default Navbar;