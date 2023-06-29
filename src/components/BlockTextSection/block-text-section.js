import Block from "../Blocks/image-block";
import { motion,useInView,useAnimate } from "framer-motion";
import "../../pages/HomePage/Home.css"
import { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
    width:90%;
    margin: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap-reverse;
    flex-direction:${({reverse})=>reverse?"row":"row-reverse"};
    @media screen and (max-width:950px){
        flex-direction:column-reverse;
    }
    @media screen and (max-width:950px){
        gap: 2.5rem;
    }
`
const BlockContainer = styled.div`
    width:45%;
    height: 45vh;
    margin: 0 0 1.4rem 0;

    @media screen and (max-width:950px){
        width: 80%;
    }
`
const TextContainer = styled.div`
    text-align: ${({textAlign})=>textAlign?textAlign:'center'};
    flex: .8;
    transform: translateY(1rem);
    align-self: start;
    margin-top: 1rem;
    @media screen and (max-width:950px) {
        text-align: center;
    }
`
const Paragraph = styled.p`
    font-size: 1rem;
    font-weight: 500;
    color:white;
   
    @media screen and (max-width:530px) {
        font-size: 1.3rem;
    }
    @media screen and (max-width:500px) {
        display:none;
    }
`
const Title = styled.div`
    font-weight: 900;
    font-size: 3rem;
    white-space:pre-line;
    color:white;
    
    margin-bottom: 1rem;
    @media screen and (max-width:950px) {
        align-self: center;
        margin-top: 0rem;
    }
    @media screen and (max-width:530px) {
        font-size: 2rem;
        flex:1;
    }
       
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

function BlockTextSection(props){
    const [scope,animate] = useAnimate()
    const isInView = useInView(scope,{once:true})
    const [scope2,animate2] = useAnimate()

    const [scope3,animate3] = useAnimate()
    const [scope4,animate4] = useAnimate()
    const isInView2 = useInView(scope3,{once:true})

    useEffect(()=>{
        if (isInView){
            animate(scope.current,pargAnimation.animation)
            animate2(scope2.current, pargAnimation.animation)
           
        }
    },[isInView])

    useEffect(()=>{
        if (isInView2){
            animate3(scope3.current,pargAnimation.animation)
            animate4(scope4.current, pargAnimation.animation)
        }  
    },[isInView2])

  
    
    return(
        <Container reverse={props.reverse}>
            <BlockContainer className="section4-content-block"> 
                <Block 
                    left={props.left}
                    place={props.img} 
                    title={props.imgTitle}
                />
            </BlockContainer>
            <TextContainer textAlign={props.textAlign}>
                <Title as={motion.h2}
                    variants={pargAnimation}
                    initial="initial"
                    ref={scope3}
                >
                    {props.title}
                </Title>
                <Paragraph as={motion.p}
                    variants={pargAnimation}
                    initial="initial"
                    ref={scope4}
                >
                    {props.text}
                </Paragraph>
            </TextContainer>
        </Container>
    )
}

export default BlockTextSection;