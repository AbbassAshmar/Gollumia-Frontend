import React from "react";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import MoviesNav from "../../components/MainNavbar/moviesNavbar";
import "./moviesPage.css"
import Crousel from "../../components/Carousel/carousel";
import SmBtn from "../../components/Button/SmBtn";
import Category from "../../components/Category/Category"
import {TrendingMovies} from "../../components/TrendingMovies/TrendingMovies"
import LatestMovies from "../../components/LatestMovies/LatestMovies"
import UpcomingMovies from "../../components/UpcomingMovies/UpcomingMovies";
import App from "../../components/Footer/Footer";
import styled from "styled-components";

export const Movies_Container = styled.div`
    min-height: 200%;
    width: 87%;
    margin: auto;
    overflow: hidden;
@media screen and (max-width:1400px){
    .moviesBackground{
        width: 95%;
    }
}

`
export function MoviesPage(){
    const [cookies , setCookies, removeCookie] = useCookies(["token"])
    const navigate = useNavigate()
    const[dataState, setData]= useState([])
    useEffect(()=>{
            async function fetchData(){
                let apidata =  await fetch("http://127.0.0.1:8000/api/");
                if(apidata.ok == true && apidata.status == 200){
                    let response = await apidata.json()
                    setData(response)                   
                }
            }
            fetchData()
        },[])
        
    useEffect(
        () => {
            console.log(cookies)
            if (cookies.token==null){
                navigate('/login', {replace:true})
            }
     },[])
        
    
   
    return(
        <div className="moviesPageContainer">
            <div style={{backgroundColor:"black"}}>
                <MoviesNav></MoviesNav>
            </div>    
            <Movies_Container >
                <section className="crouselsection">
                    <Crousel Moviesdata={dataState} />
                    <div className="socialMedia-MoviesPage">
                        <div>
                            <SmBtn small={false} icon="facebook-f" color="blue" className="fb" text="facebook"></SmBtn>
                            <SmBtn small={false} icon="instagram" color="#ac2bac" className="fb" text="Instagram"></SmBtn>
                            <SmBtn small={false} icon="twitter" color="#1DA1F2" className="fb" text="twitter"></SmBtn>
                            <SmBtn small={false} icon="github" color="orange" className="fb" text="github"></SmBtn>
                        </div>
                        <p style={{margin:"1rem 0 0 0",fontSize:".9rem",fontWeight:"100"}}>
                            Watch Movies Online Free<br></br>
                            Watch all kinds of popular movies and forget about handing your money to netflix. At <span style={{color:"orange"}}>AFLIX</span>, A stands for Aree (free) !<br></br>
                            When sankes are born with two heads, they fight each other food, that's why we offer you the best place to watch movies and have the best experience ! <br></br>
                            Wubba Lubba Dub Dub !
                        </p>
                    </div>
                </section>
                <section className="moviesSection">
                    <Category ctg="Trending" />
                    <TrendingMovies />
                    <Category ctg="Latest" />
                    <LatestMovies />
                    <Category ctg="Upcoming" />
                    <UpcomingMovies />
                </section>
            </Movies_Container>
            <div style={{height:"3.5rem",width:"100%"}}></div>
            <div className="emptyline"></div>
            <div style={{height:"1rem",width:"100%"}}></div>
            <App/>
        </div>
    )
}
