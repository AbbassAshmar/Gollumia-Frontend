import styled from "styled-components";
import MoviesNav from "../MainNavbar/movies-navbar";
import App from "../Footer/footer";
import { useEffect } from "react";

const Main = styled.div`
    background : black;
    width:100%;
`
const MoviesContainer = styled.div`
    width :97%;
    background:black;
    margin:auto;
    padding-top:1rem;
`

function MoviesPagesContainers({children}){
   
    return (
        <div style={{background:"black"}}>
            <MoviesNav/>
            <Main>
                <MoviesContainer>
                    {children}
                </MoviesContainer>
           </Main>
           <div style={{background:"black"}}> 
            <App></App>
           </div>
        </div>
    )
}

export default MoviesPagesContainers;  