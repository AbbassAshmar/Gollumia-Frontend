import React from "react";
import  img1 from '../../photos/img1.jpg';
import  img2 from '../../photos/img2.jpg';
import img3 from "../../photos/img3.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'
import InputField from "../../components/Input/input";
import Block from "../../components/Blocks/image-block";
import Footer from "../../components/Footer/footer";
import Navbar from "../../components/Navbar/navbar"

function Home(){
    return(
        <>
        <div className="page1">
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
        <div className="page2">
            <div className="page2-content">
                <div className="text">
                    <h2>Watch,<br></br>Download,<br></br>And Enjoy Everywhere!</h2>
                    <p>
                        Watch on all kind of devices thousands of movies
                        and have the ability to Download on your own device 
                        and watch at any time anywhere. Available on Apple, Samsung,
                        Nokia, Macos, Windows, Microwave, Toilet Papers and Sterling's butt.
                    </p>
                </div>
                <div className="page2-blocks">
                    <Block place={img1} title="momento"/>
                    <Block place={img2} title="deadpool"/>
                </div>
            </div>   
        </div>
        <div className="emptyline" ></div>
        <div className="section4">
            <div  className="section4-content-container">
                <div className="section4-content-block"> 
                    <Block place={img3} title="theincredibles"/>
                </div>
                <div className="section4-content-text">
                    <h2>Amazing Movies</h2>
                    <p>
                        Intertaining movies from all genres for all ages,especially for kids, I want kids,
                        and at any time 
                    </p>
                </div>
            </div>
        </div>
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