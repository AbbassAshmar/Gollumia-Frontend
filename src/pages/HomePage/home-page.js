import React, { useEffect } from "react";
import styled from "styled-components";
import Section1 from "./sections/section-1";
import GenresSection from "./sections/genres-section";
import TrendingSection from "./sections/trending-section";
import HighLightsSection from "./sections/highlights-section";
import FormSection from "./sections/form-section";

const Container = styled.div`
gap:7rem;
width: 100%;
display: flex;
flex-direction: column;
background-color: black;
scroll-behavior: smooth;
@media screen and (max-width:1024px){
    gap:3rem;
}

`
const TrendingHighLight = styled.div`
gap:1rem;
width: 100%;
display: flex;
flex-direction: column;
background-color: black;
@media screen and (max-width:1024px){
    gap:3rem;
}
`

export default function Home(){
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return(
        <Container>
            <Section1 />
            <GenresSection />
            <TrendingHighLight>
                <TrendingSection />
                <HighLightsSection />
            </TrendingHighLight>
            <FormSection />
        </Container>
    )
}
