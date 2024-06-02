import React from "react";
import styled from 'styled-components'
import {Link} from 'react-router-dom'


const PosterContainer = styled.div`
width: 100%;
aspect-ratio: 1/1.35;
border-radius: 8px;
overflow: hidden;
min-width:0;
position: relative;
&:before{
    content:"";
    height:100%;
    width:100%;
    top:0;
    left:0;
    opacity:0;
    position: absolute;
    background-color:black;
    transition:opacity .3s;
}
`

const Container = styled(Link)`
gap:.5rem;
display: flex;
flex-direction: column;
align-items: flex-start;
text-decoration: none;
width: 100%;
height:100%;
min-width:0;
&:hover p{
    color:orange;
}

&:hover ${PosterContainer}::before{
    opacity:.3;
}
&:hover i{
    opacity:1;
}
`
const Poster = styled.img`
width:100%;
height:100%;
object-fit: cover;
border-radius: 8px;
`

const Play = styled.i`
position: absolute;
font-size:3.5rem;
color:orange;
top:50%;
left:50%;
transform: translate(-50%,-50%);
transition:opacity .3s;
opacity:0;
`

const Title = styled.p`
margin:0;
width:80%;
color:white;
overflow: hidden;
font-size:1rem;
font-weight:600;
white-space: nowrap;
text-overflow:ellipsis;
`
export default function MovieCard(props){
    return(
        <Container to={`/movies/${props.id}`}>
            <PosterContainer>
                <Poster src={props.poster}/>
                <Play className="fa-regular fa-circle-play"/>
            </PosterContainer>
            <Title>{props.title}</Title>
        </Container>
    );
}

