import { useRef } from "react";
import MovieCard from "../../../components/MovieCard/movie-card";
import styled from "styled-components";
import { useScroll, useTransform } from "framer-motion";

const Container = styled.div`
flex:1;
width:100%;
height:100%;
border-radius: 8px;
`

export default function ParallaxMovieCard({movie={}, isLoading=false, posterOnly=false}){
    const containerRef = useRef();
    const {scrollYProgress} = useScroll({
        target : containerRef,
        offset : ['start end' , 'end start']
    })

    const imageStyle = {
        y : useTransform(scrollYProgress, [0,1], ['30px', '-40px']),
    }

    return (
        <Container ref={containerRef}>
            <MovieCard movie={movie} isLoading={isLoading} posterOnly={posterOnly} imageStyle={imageStyle}/>
        </Container>
    )
}