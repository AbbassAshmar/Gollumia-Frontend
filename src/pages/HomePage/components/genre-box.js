import { useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion, useTransform, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect } from "react";

const Container = styled.div`
gap:3rem;
display: flex;
position:relative;
align-items: flex-end;
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

`
const Image = styled.img`
width:140%;
max-width: 140%;
height:140%;
object-fit: cover;
`
const TextContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap:1rem;
position:relative;
`
const GenreName = styled.h4`
color:white;
font-weight:bold;
font-size:var(--heading-4);
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
width:100%;
height:90%;
z-index:-2;
position:absolute;
bottom:10%;
filter:blur(180px);
opacity:.8;
left:-80%;
background-color: ${({$color})=>$color};
`
const BluredCircle2= styled(BluredCircle)`
left:50%;
background-color: ${({$color})=>$color};
`

export default function GenreBox({name, image, colors, style}){
    const imageContainerRef = useRef();

    const {scrollYProgress} = useScroll({
        target: imageContainerRef,
        offset:['start end', 'end start']
    })

    useEffect(()=>{console.log(style)},[style])
    const imageY = useTransform(scrollYProgress, [0,1], ['20%', '-20%']);
    const imageScale = useTransform(scrollYProgress, [0,1], [.9, 1.1]);
    return(
        <Container style={style}>
            <BluredCircle $color={colors[0]}/>
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
            <BluredCircle2 $color={colors[1]}/>
        </Container>
    )
}