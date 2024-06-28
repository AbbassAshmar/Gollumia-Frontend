import styled from "styled-components"
import { Link } from "react-router-dom";
import Garfield from "../../../photos/Garfield.jpg";
import {motion, useMotionValueEvent, useScroll, useTransform} from "framer-motion";
import { useEffect, useRef } from "react";
import useWindowDimensions from "../../../hooks/use-window-dimensions";

const Container = styled.div`
width:100%;
display: flex;
flex-direction: column;
background-color: black;
@media screen and (max-width:500px){
    height:55vh;
}
`
const ContentContainer = styled.div`
flex: 1;
width: 100%;
height: 100%;
display: flex;
overflow: hidden;
position: relative;
align-items: center;
flex-direction: column;
justify-content: center;
&::before{
    content:"";
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height:100%;
    z-index: 1;
    background:radial-gradient(circle, rgba(0,0,0,.5) 13%, rgba(0,0,0,.3) 70%, rgba(0,0,0,.7) 100%);   
} 
`
const Content = styled.div`
top:48%;
left:50%;
gap:2rem;
width: 80%;
z-index:10;
display: flex;
position: absolute;
align-items: center;
justify-content: center;
flex-direction: column;
transform:translate(-50%,-50%);
`

const Title = styled.h1`
color:white;
font-weight: 700;
text-align: center;
letter-spacing: .02;
font-size:var(--heading-1);
text-shadow: 0px 4px 8px rgba(0,0,0,0.5);
@media screen and (max-width:975px){
    font-size:var(--heading-3);
}
@media screen and (max-width:768px){
    font-size:var(--heading-1-mobile);
}
`
const JoinUs = styled(Link)`
color:white;
border:none;
font-weight: 600;
border-radius:4px;
background:orange;
padding:.5rem 1rem;
text-decoration: none;
font-size:var(--heading-6);
box-shadow: 0px 4px 8px rgba(0,0,0,.5);
&:hover{
    background:darkorange;
    color:white;
}
@media screen and (max-width:768px){
    font-size:var(--heading-6-mobile);
}
`
const Image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
transform:translateY(0px);
will-change:transform;
`

export default function Section1(){
    const {width} = useWindowDimensions();
    const containerRef = useRef();
    const {scrollYProgress} =  useScroll({
        target: containerRef,
        offset: ['0' , 'end start']
    })

    const imageY = useTransform(scrollYProgress,[0,1],['-0.1%','-12%']);
    const imageScale = useTransform(scrollYProgress, [0,1], [1.1, 1.3]);
    const contentY = useTransform(scrollYProgress,[0,1],['-50%','-0%']);


    useEffect(()=>{
        imageY.set("-0%")
        imageScale.set(1.1)
    }, [])

    return(
        <Container ref={containerRef}>
            <ContentContainer>
                <Content as={width >800 ? motion.div : ""} style={{y:contentY,x:"-50%"}}>
                    <Title>
                        Gollumia <br/>
                        “There's no place like home”
                    </Title>
                    <JoinUs to="/login">Join Us Now</JoinUs>
                </Content>
                <Image as={width >800 ? motion.img : ""} style={{ y: imageY, scale: imageScale }} src={Garfield} alt="garfield movie image"/>
            </ContentContainer>
        </Container>
    )
}