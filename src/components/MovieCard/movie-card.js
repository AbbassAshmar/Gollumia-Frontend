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
`
const Card = styled.div`
display:flex;
flex-direction:column;
gap:4px;

@media screen and (max-width:481px){
    transform :scale(.8);
}
@media screen and (max-width:404px){
    transform :scale(.78);
}
@media screen and (max-width:376px){
    transform :scale(.7);
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
        @media screen and (max-width:843px){
            width: 220px;
            height: 290px;
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