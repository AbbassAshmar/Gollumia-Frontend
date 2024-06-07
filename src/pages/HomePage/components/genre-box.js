import { useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {motion, useTransform, useScroll} from "framer-motion";
import MovieCard from "../../../components/MovieCard/movie-card";


const Container = styled.div`
width: 100%;
display: flex;
justify-content: flex-end;
padding-bottom: 5rem;
position: relative;
&:last-child{
    padding-bottom: 0;
}
@media screen and (max-width:800px){
    padding-bottom: 2rem;
}
`
const GenreCardContainer = styled.div`
gap:3rem;
z-index:1;
width: 100%;
display: flex;
position:relative;
align-items: flex-end;
@media screen and (max-width:1024px) {
    flex-direction: column;
    align-items: center;
}
@media screen and (max-width:728px){
    gap:1rem;
}
`
const ImageContainer = styled.div`
width:75%;
z-index:2;
display:flex;
overflow: hidden;
position:relative;
border-radius: 10px;
aspect-ratio: 1.5/1;
align-items: center;
justify-content:center;
@media screen and (max-width:1024px){
    width:100%;
}
`
const Image = styled.img`
width:140%;
max-width: 140%;
height:140%;
object-fit: cover;
`
const TextContainer = styled.div`
gap:1rem;
display: flex;
position:relative;
flex-direction: column;
align-items: flex-start;
@media screen and (max-width:1024px) {
    flex-direction: row;
    align-items: center;
}
`
const GenreName = styled.h4`
color:white;
padding:0;
margin:0;
font-weight:bold;
font-size:var(--heading-4);
@media screen and (max-width:768px) {
    font-size:var(--heading-4-mobile);
}
`
const ViewAllLink = styled(Link)`
color:var(--main-color);
font-size: var(--body);
text-decoration:none;
transition: color .3s;
&:hover{
    color:var(--main-color-dark);
}
`
const BluredCircle = styled.div`  
left: 40%;
opacity: .4;
top: 10%;
height: 70%;
width: 100%;
z-index:0;
position:absolute;
bottom:10%;
filter:blur(200px);
left: -75%;
background-color: ${({$color})=>$color};
@media screen and (max-width:800px) {
    height: 100%;
    width: 100%;
    top: -8%;
}
`

const BluredCircle2= styled(BluredCircle)`
left:50%;
background-color: ${({$color})=>$color};
`

export default function GenreBox({name, image, colors, style, movie, isLoading}){
    const imageContainerRef = useRef();

    const {scrollYProgress} = useScroll({
        target: imageContainerRef,
        offset:['start end', 'end start']
    })

    const imageY = useTransform(scrollYProgress, [0,1], ['20%', '-20%']);
    const imageScale = useTransform(scrollYProgress, [0,1], [1, 1.15]);

    return(
        <Container>
            <BluredCircle $color={colors[0]}/>
            <GenreCardContainer>
                <ImageContainer ref={imageContainerRef}>
                    <Image as={motion.img} src={image} style={{y:imageY,scale:imageScale}}/>
                </ImageContainer>
                <TextContainer>
                    <GenreName>{name}</GenreName>
                    <ViewAllLink to={`/movies?genre=${name}`}>
                        View all 
                        <i style={{marginLeft:".5rem"}} className="fa-solid fa-arrow-right"/>
                    </ViewAllLink>
                </TextContainer>
            </GenreCardContainer>
            <BluredCircle2 $color={colors[1]}/>
        </Container>
    )
}