import React from 'react';
import styled, { keyframes } from 'styled-components';

const loadingAnimation = keyframes`
0% {opacity: 0.5;}
100% {opacity: 1;}
`
const Container = styled.div`
border-radius: 8px;
background-color:black;
width: ${(props) => props.width || '100%'};
height: ${(props) => props.height || '1em'};
margin: ${(props) => props.margin || '0'};
`
const Animation = styled.div`
width: 100%;
height: 100%; 
border-radius: 8px;
background-color: rgba(255,255,255,.4);
animation: ${loadingAnimation} 1s infinite alternate;
`
export default function LoadingText({width, height, margin}){
    return (
        <Container width={width} height={height} margin={margin}>
            <Animation />
        </Container>
    )
}

