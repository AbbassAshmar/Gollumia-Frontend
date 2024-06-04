import React, { useEffect } from "react";
import img2 from '../../photos/img2.jpg';
import img4 from "../../photos/img4.jpg"
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'
import InputField from "../../components/Input/input";
import Footer from "../../components/Footer/footer";
import { useAnimate,useInView} from "framer-motion"
import BlockTextSection from "../../components/BlockTextSection/block-text-section";
import styled from "styled-components";
import Section1 from "./sections/section-1";

const Container = styled.div`

`
const Page2 = styled.div`
width: 100%;
background-color: #000000;
min-height:100vh;
display:flex;
overflow:hidden;
align-items:center;
border-top: 6px solid rgb(121, 80, 3);

@media screen and (max-width:500px){
    min-height:0;
}
`
const Page3= styled.div`
    width: 100%;
    display: flex;
    background-color: #000000;
    align-items: center;
    justify-content: center;
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
const InputContainer = styled.div`
color:white;
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

        <Page2>
            <BlockTextSection 
            textAlign={"left"}
            img={img2} 
            imgTitle={"Deadpool"}
            title={"Watch,\nDownload,\nAnd Enjoy Everywhere!"} 
            text={"Watch on all kind of devices thousands of movies"+
            "and have the ability to Download on your own device "+
            "and watch at any time anywhere. Available on Apple, Samsung, "+
            "Nokia, Macos, Windows, Microwave, Toilet Papers and Sterling's butt."}
            /> 
        </Page2>
        <Page2>
            <BlockTextSection
            left={true}
            reverse={true} 
            img={img4} 
            imgTitle={"kids"}
            title={"Amazing Movies"} 
            text={"Intertaining movies from all genres for all ages,especially for kids, I want kids,and at any time "}
            />
        </Page2>


        <Section4>
            <InputContainer>
                <p>Enter Your email now and Join the best movie community in one click !</p>   
                <InputField lab={false}/>
            </InputContainer>
            <Footer className='bg-dark'/>   
        </Section4>
           
        </Container>
    )
}

export default Home;