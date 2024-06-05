import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "../../components/Footer/footer";
import { useAnimate,useInView} from "framer-motion"
import styled from "styled-components";
import Section1 from "./sections/section-1";
import GenresSection from "./sections/genres-section";

const Container = styled.div`
gap:7rem;
display: flex;
flex-direction: column;
background-color: black;
`

const Section4 = styled.div`
padding-top:4rem;
background-color: black;
border-top: 6px solid rgb(121, 80, 3);
display:flex;
flex-direction: column;
gap:4rem;
align-items: center;
justify-content: center;
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
        <Container>
            <Section1 />
            <GenresSection />
            <Section4>
                <Footer />   
            </Section4>
           
        </Container>
    )
}

export default Home;