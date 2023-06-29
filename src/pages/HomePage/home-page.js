import React, { useEffect } from "react";
import  img2 from '../../photos/img2.jpg';
import img4 from "../../photos/img4.jpg"
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'
import InputField from "../../components/Input/input";
import Footer from "../../components/Footer/footer";
import Navbar from "../../components/Navbar/navbar"
import { useAnimate,useInView} from "framer-motion"
import BlockTextSection from "../../components/BlockTextSection/block-text-section";
import styled from "styled-components";

const Page2 = styled.div`
width: 100%;
background-color: #000000;
min-height:100vh;
display:flex;
overflow:hidden;
align-items:center;
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
        <>
        <div className="page1" style={{overflow:"hidden"}}>
            <div className="page1-container">
                <Navbar />
                <div className="main-content">
                    <div className="parg">
                        <h2>Get Into the paradise of movies</h2>
                        <h3>Where Filmers are born</h3>
                    </div>
                    <InputField lab={true}/> 
                </div>
            </div>
        </div>
        <div className="emptyline"></div>
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
        <div className="emptyline" ></div>
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
        <div className="emptyline" ></div>
        <div style={{width:"100%",height:"5%", background:"black"}}></div>
        <div className="page3">
            <div className="page3-content">
                <InputField lab={false}/>
                <p>Enter Your email now and Join the best movie community in one click !</p>   
            </div>
        </div>
        <Footer className='bg-dark'/>
        <div className="emptyline"></div>
           
        </>
    )
}

export default Home;