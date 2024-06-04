import styled from "styled-components"
import SimplifiedNavbar from "../../../components/SimplifiedNavbar/simplified-navbar";
import { Link } from "react-router-dom";
import Garfield from "../../../photos/Garfield.jpg";
import {motion, useMotionValueEvent, useScroll, useTransform} from "framer-motion";
import { useRef } from "react";

const Container = styled.div`
width:100%;
min-height: 100vh;
display: flex;
flex-direction: column;
background-color: black;
`
const ContentContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
position: relative;
height: 100%;
width: 100%;
flex: 1;
overflow: hidden;

&::before{
    content:"";
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height:100%;
    z-index: 1;
    background:radial-gradient(circle, rgba(0,0,0,.5) 13%, rgba(0,0,0,.3) 70%, rgba(0,0,0,.7) 100%);   
    /* background:rgba(0,0,0,.3); */
} 

`
const Content = styled.div`
gap:2rem;
position: absolute;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
top:48%;
left:50%;
transform:translate(-50%,-50%);
z-index:10;
`

const Title = styled.h2`
font-size:4rem;
letter-spacing: .02;
text-align: center;
color:white;
font-weight: 700;
text-shadow: 0px 4px 8px rgba(0,0,0,0.5);
`
const JoinUs = styled(Link)`
padding:.5rem 1rem;
font-size:1.3rem;
background:orange;
border-radius:4px;
border:none;
font-weight: 600;
text-decoration: none;
color:white;
box-shadow: 0px 4px 8px rgba(0,0,0,.5);
&:hover{
    background:darkorange;
    color:white;
}
`

const Image = styled.img`
object-fit: contain;
will-change:transform;
`
export default function Section1(){
    const containerRef = useRef();
    const {scrollYProgress} =  useScroll({
        target: containerRef,
        offset: ['start start' , 'end start']
    })

    const imageY = useTransform(scrollYProgress,[0,1],['-100px','150px']);
    const imageScale = useTransform(scrollYProgress, [0,1], [1.1, 1.3]);

    const contentY = useTransform(scrollYProgress,[0,1],['-50%','-0%']);

    return(

        <Container ref={containerRef}>
            <SimplifiedNavbar style={{zIndex:"100",position:"absolute",top:"0",left:'0'}}/>

            <ContentContainer>
                <Content as={motion.div} style={{y:contentY,x:"-50%"}}>
                    <Title>
                        AFLIX <br/>
                        “There's no place like home”
                    </Title>
                    <JoinUs to="/login">Join Us Now</JoinUs>
                </Content>

                <Image as={motion.img} style={{ y: imageY, scale: imageScale }} src={Garfield} alt="garfield movie image"/>
            </ContentContainer>

        </Container>

    )
}