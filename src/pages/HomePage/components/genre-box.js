import { useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {motion, useTransform, useScroll} from "framer-motion";

const Container = styled.div`
gap:3rem;
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

    const imageY = useTransform(scrollYProgress, [0,1], ['20%', '-20%']);
    const imageScale = useTransform(scrollYProgress, [0,1], [1, 1.15]);

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