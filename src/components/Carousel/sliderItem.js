import React, { useEffect, useState} from "react";
import styled from "styled-components";

const Div = styled.div`
    width:100%;
    display:flex;
    justify-content:flex-start;
    align-items:flex-end;
    background-position:center;
    background-size:cover;
    position:relative;
    z-index:0;
    cursor:pointer;
    min-height:47vh;
    &::before{
        content: " ";
        width: 100%;
        height: 100%;
        position: absolute;
        background: radial-gradient(circle farthest-corner at left, rgba(0,0,0,0.8),rgba(0,0,0,0.8)  , transparent,transparent, rgba(0,0,0,0) , rgba(0,0,0,0.9));
        z-index: -1;
    }
   
`
const H1t = styled.h1`
    font-size:3rem;
    color:white;
    font-weight:500;
    font-family: 'Bebas Neue', sans-serif;
    margin :0;
    align-self: end;
    cursor:pointer;

    @media screen and (max-width:376px){
        font-size:1.5rem;
        font-weight:100;
    }
`
const Plot = styled.p`
    color:white;
    font-size:1rem;
    margin:0 0 0 3px;
    align-self:start;
    cursor:text;

    @media screen and (max-width:990px){
        display:none;
    }
`
const Dir =styled.p`
    font-size:1rem;
    color:white;
    margin:0;
    
    @media screen and (max-width:376px){
        font-size:.8rem;
    }
`
const Genre = styled.h3`
    color:white;
    margin:0 0 0 3px;
    font-size:1rem;
    align-self:start;
    position:relative;
    bottom:24%;
    cursor:text;
    @media screen and (max-width:376px){
        font-size:.8rem;
    }
`
const Rating = styled.h5`
    color :orange;
    font-size:3rem;
    font-family: 'Bebas Neue', sans-serif;
    margin:0;

    @media screen and (max-width:990px){
        font-size:2.5rem;
    }
    @media screen and (max-width:376px){
        font-size:1.3rem;
    }
`
const Time = styled.p`
    margin:0 0 0 3px;
    color:white;
    background-color:orange;
    padding:0.03rem 0.2rem 0.03rem 0.15rem;
    border-radius: .2rem;

    @media screen and (max-width:376px){
        font-size:.8rem;
        padding:0 0.18rem 0 0.13rem;
    }
    
`
const CarouselInfo = styled.div`
    cursor:default;
    width:35%;
    min-width:35%;
    margin:0 0 0 0;
    height:100%;
    display:grid;
    grid-template-columns:1;
    grid-template-rows: 2.7fr 7rem repeat(3,1fr);
    line-height:22px;

    @media screen and (max-width:990px){
        height:30%;
        width:100%;
        background:blue;
        grid-template-rows:1.5fr 1fr 1fr 1fr;
    }
    @media screen and (max-width:376px){
        height:20vh;
    }
`

const MetaRating = styled.div`
    display:flex; 
    flex-direction:column; 
    justify-content:start; 
    align-items:start;
    margin-left:3px;
    position:relative;
    bottom:20%;
    @media screen and (max-width:376px){
        display:none;
    }
`

const ImdbRating = styled.div`
    display:flex; 
    flex-direction:column; 
    justify-content:start; 
    align-items:start;
    margin-left:3px;
    position:relative;
    bottom:20%;
    @media screen and (max-width:376px){
        flex-direction:row-reverse; 
        align-items:center;
        justify-content:center; 
        gap:4px;
    }

`
function SliderItem(props){
    const [bg , Setbg] = useState('')

    useEffect(()=>{
        Setbg(props.imgsrc)
        styles.carouselInfoContainer.backgroundImage=`url(${require(`./carouselPhotos/AvatarTheWayofWater.jpg`)})`;
    }, [props])
    
    const styles = {
        ratingSide1:{
            textAlign:"center",
            fontSize:".8rem",
            color:"white",
            opacity:"0.8",
            alignSelf:"center",
            margin:'0 0 0 0px',
            
        },
        ratingSide:{
            textAlign:"center",
            fontSize:".8rem",
            color:"white",
            opacity:"0.8",
            margin:'0',
            lineHeight:"15px"
        },
        directorStyle:{
            display:"flex",
            alignSelf:"start",
            gap:"1rem",
        },
        carouselInfoContainer:{
            backgroundImage:`url(${require(`../Carousel/carouselPhotos/${props.imgsrc}`)})`,
            
        },
        
    
    }
    
   

    return(
        <Div id={`carousal" ${props.title}`} style={styles.carouselInfoContainer}>
            <CarouselInfo>
                <H1t>{props.title}</H1t>
                <Plot>{props.plot}</Plot>
                <div style={styles.directorStyle}>
                    <Time>{props.time}m</Time>
                    <Dir>{props.dir}</Dir>
                </div>
                <Genre>{props.year} <span style={{fontSize:"2rem",margin:"0 3px 0 8px"}}> .  </span> {props.genre}</Genre>
                <div style={{display:"flex",gap:"1rem"}}>
                    <ImdbRating>
                        <Rating>{props.imdb}</Rating>
                        <p style={styles.ratingSide1}>IMDB</p>
                    </ImdbRating>
                    <MetaRating>
                        <Rating>{props.metaCritics}<sub style={{fontSize:".7rem"}}>%</sub></Rating>
                        <p style={styles.ratingSide}>Meta<br></br>Critics</p>
                    </MetaRating>
                </div>
            </CarouselInfo>
        </Div>  
    )
}

export default SliderItem;