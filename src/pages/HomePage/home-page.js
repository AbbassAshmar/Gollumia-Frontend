import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "../../components/Footer/footer";
import styled from "styled-components";
import Section1 from "./sections/section-1";
import GenresSection from "./sections/genres-section";
import TrendingSection from "./sections/trending-section";

const Container = styled.div`
gap:7rem;
width: 100%;
display: flex;
flex-direction: column;
background-color: black;
@media screen and (max-width:1024px){
    overflow: hidden;
    gap:3rem;
}

`

const Section4 = styled.div`
gap:4rem;
display:flex;
padding-top:4rem;
align-items: center;
flex-direction: column;
justify-content: center;
background-color: black;
border-top: 6px solid rgb(121, 80, 3);
`

const pargAnimation = {
    initial:{
        y:200,
        opacity:0,
    },
    animation:{
        y:0,
        opacity:1,
        transition:{
            type:"tween"
        }
    }
}

function Home(){

    return(
        <Container>
            <Section1 />
            <GenresSection />
            <TrendingSection />
            <Section4>
                <Footer />   
            </Section4>
        </Container>
    )
}

export default Home;