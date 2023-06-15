import React from "react";
import styled from 'styled-components'
import {Link} from 'react-router-dom'


let HoverDiv = styled.div`
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.6);
    display:flex;
    flex-direction:column;
    justify-content:start;
    gap:10%;
    color:orange;
    opacity:0;
    transition:all 0.4s;
    justify-self:start;
`
const Title = styled.div`
    color:white;
    margin:0;
    display:block;
    white-space: nowrap;
    padding:0;
    transition: opacity 0.3s;
    height:4vh;
    max-width:180px;
    font-size:1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover{
        opacity:0.5;
    }
    @media screen and (max-width:688px){
        max-width:160px;
    }
    @media screen and (max-width:404px){
        max-width:140px;
    }
    @media screen and (max-width:335px){
        max-width: 130px;
    }
`
const Card = styled.div`
display:flex;
flex-direction:column;
gap:4px;
justify-self:center;
width:170px;
margin: 0 0 1rem 0;

@media screen and (max-width:1100px){
    width: 210px;
}

@media screen and (max-width:670px){
    width: 180px;    
}
@media screen and (max-width:543px){
    width: 220px;
    
}

@media screen and (max-width:482px){
    width: 200px;
}
@media screen and (max-width:440px){
    width: 190px;
}
@media screen and (max-width:404px){
    width: 170px;
}
@media screen and (max-width:379px){
    width: 150px;
}
@media screen and (max-width:335px){
    width: 130px;
}
@media screen and (max-width:292px){
    width: 120px;
}
@media screen and (max-width:269px){
    width: 105px;
}
`


let Cardcontainer= styled.div`
    box-sizing: border-box;
    width: 190px;
    height: 254px;
    background: url(${({poster})=>poster});
    background-position:center;
    background-size:cover;
    border: 1px solid white;
    box-shadow: 12px 17px 51px rgba(0, 0, 0, 0.22);
    backdrop-filter: blur(6px);
    border-radius: 17px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    font-weight: bolder;
    overflow:hidden;
        &:hover{
            border: 1px solid orange;
            transform: ${({hoverScale}) => hoverScale ? "None" : "scale(0.95) rotateZ(6deg)"}
        }
        &:active {
            transform: ${({hoverScale}) => hoverScale ? "None" : "scale(0.95) rotateZ(6deg)"};
            }
        &:hover #HoverDiv{
            opacity:1;
        }
        @media screen and (max-width:1100px){
            width: 210px;
            height: 280px;
        }
        @media screen and (max-width:959px){
            width: 200px;
            height: 270px;
        }
        @media screen and (max-width:890px){
            width: 220px;
            height: 290px;
        }
        @media screen and (max-width:786px){
            width: 200px;
            height: 280px;
        }

        @media screen and (max-width:670px){
            width: 180px;
            height: 260px;
        }
        @media screen and (max-width:620px){
            width: 170px;
            height: 250px;
        }
        @media screen and (max-width:543px){
            width: 220px;
            height: 290px;
        }
        @media screen and (max-width:482px){
            width: 200px;
            height: 270px;
        }
        @media screen and (max-width:440px){
            width: 190px;
            height: 250px;
        }
        @media screen and (max-width:404px){
            width: 170px;
            height:220px;
        }
        @media screen and (max-width:379px){
            width: 150px;
            height:210px;
        }
        @media screen and (max-width:335px){
            width: 130px;
            height:190px;
        }
        @media screen and (max-width:292px){
            width: 120px;
            height:175px;
        }
        @media screen and (max-width:269px){
            width: 105px;
            height:155px;
        }
        
        
`

function MovieCard(props){
    const playButton = {
        fontSize:"3.5rem"
    }
    const movieObj = {
        title:props.title,
        poster:props.poster,
        imdb:props.imdb,
        meta:props.meta,
        plot:props.plot,
        director:props.director,
        rated: props.rated ? props.rated: "N/A",
        year: props.released,
        genres: props.genres,
        duration: props.duration,
        page_id : props.page_id,
        image : props.image,
        thumbnail : props.thumbnail,
        trailer : props.trailer,
    }
    


    return(
        <Card>
            <Cardcontainer poster = {props.poster} hoverScale={props.hoverScale}>
                <Link style={{textDecoration:"none",height:"100%",width:"100%"}} 
                to={`/movies/${props.id}`} 
                state={movieObj}>
                    <HoverDiv id="HoverDiv">
                        <div style={{marginTop:"10px"}}>
                            <i className="fa-solid fa-star"></i>
                            <p>{props.imdb}</p>
                        </div>
                        <i style={playButton} className="fa-regular fa-circle-play"></i>
                    </HoverDiv>
                </Link> 
            </Cardcontainer>
            <Link to="#" style={{overflow: "hidden",
                                textOverflow: "ellipsis",
                                display:"inline-block",
                                width:"fit-content",
                                height:"fit-content",
                                textDecoration:"none"
                                }}>
                <Title>{props.title}</Title>
            </Link>
        </Card>
       
    )
}

export default MovieCard;