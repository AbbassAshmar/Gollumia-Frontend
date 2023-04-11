import React, { useEffect, useState} from "react";
import styled from "styled-components";

const Div = styled.div`
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
    margin :0rem 0 0 0;
    
    align-self: end;
    cursor:pointer;
`
const Plot = styled.p`
    color:white;
    font-size:1rem;
    margin:0 0 0 3px;
    align-self:start;
    cursor:text;
`
const Dir =styled.p`
    font-size:1rem;
    color:white;
    
`
const Genre = styled.h3`
    color:white;
    margin:0 0 0 3px;
    font-size:1rem;
    align-self:start;
    position:relative;
    bottom:24%;
    cursor:text;
`
const Rating = styled.h5`
    color :orange;
    font-size:3rem;
    font-family: 'Bebas Neue', sans-serif;
    margin:0;
`
const Time = styled.p`
    margin-left:3px;
    color:white;
    background-color:orange;
    padding:0.03rem 0.2rem 0.03rem 0.15rem;
    border-radius: .2rem;
    
`

function SliderItem(props){
    const [bg , Setbg] = useState('')

    useEffect(()=>{
        Setbg(props.imgsrc)
        styles.carouselInfoContainer.backgroundImage=`url(${require(`./carouselPhotos/AvatarTheWayofWater.jpg`)})`;
    }, [props])
    
    const styles = {
        ratingStyle:{
            display:"flex", 
            flexDirection:"column", 
            justifyContent:"start", 
            alignItems:"start",
            marginLeft:"3px",
            position:"relative",
            bottom:"20%",
        },
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
            
        },
        directorStyle:{
            display:"flex",
            alignSelf:"end",
            gap:"1rem",
        },
        carouselInfoContainer:{
            width:"100%",
            height:"73vh",
            backgroundImage:`url(${require(`../Carousel/carouselPhotos/${props.imgsrc}`)})`,
            backgroundPosition:"top",
            backgroundSize:"cover",
            position:"relative",
            zIndex:"0",
            cursor:"pointer",
        },
        carouselInfo:{
            cursor:"default",
            width:"35%",
            maxWidth:'37%',
            minWidth:'35%',
            margin:"0 0 0 0",
            height:"100%",
            display:"grid",
            gridTemplateColumns:"1",
            gridTemplateRows: "2.7fr 7rem repeat(3,1fr)",
            lineHeight:"22px",
        }
    
    }
    
   

    return(
        <Div id={`carousal" ${props.title}`} style={styles.carouselInfoContainer}>
            <div style={styles.carouselInfo}>
                <H1t>{props.title}</H1t>
                <Plot>{props.plot}</Plot>
                <div style={styles.directorStyle}>
                    <Time>{props.time}m</Time>
                    <Dir>{props.dir}</Dir>
                </div>
                <Genre>{props.year} <span style={{fontSize:"2rem",margin:"0 3px 0 8px"}}> .  </span> {props.genre}</Genre>
                <div style={{display:"flex",gap:"1rem"}}>
                    <div style={styles.ratingStyle}>
                        <Rating>{props.imdb}</Rating>
                        <p style={styles.ratingSide1}>IMDB</p>
                    </div>
                    <div style={styles.ratingStyle}>
                        <Rating>{props.metaCritics}<sub style={{fontSize:".7rem"}}>%</sub></Rating>
                        <p style={styles.ratingSide}>Meta<br></br>Critics</p>
                    </div>
                </div>
            </div>
        </Div>  
    )
}

export default SliderItem;