import { useRef } from "react";
import MovieCard from "../../../components/MovieCard/movie-card";
import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";

const Container = styled.div`
flex:1;
width:100%;
height:100%;
`

export default function ParallaxMovieCard({movie={}, isLoading=false, posterOnly=false, imageY=[0,0], containerY=[0,0]}){
    const containerRef = useRef();
    const {scrollYProgress} = useScroll({
        target : containerRef,
        offset : ['start end' , 'end start']
    })

    const imageStyle = {
        y : useTransform(scrollYProgress, [0,1], imageY),
        scale : 1.3
    }
    
    const contY = useTransform(scrollYProgress, [0,1], containerY)

    return (
        <Container as={motion.div} style={{y:contY}} ref={containerRef}>
            <MovieCard movie={movie} isLoading={isLoading} posterOnly={posterOnly} imageStyle={imageStyle}/>
        </Container>
    )
}