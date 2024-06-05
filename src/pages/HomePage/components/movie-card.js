import styled, { keyframes } from "styled-components";

const Container = styled.div`
width:100%;
height:100%;
aspect-ratio: 1/1.5;
`

const Poster = styled.img`
object-fit: cover;
width: 100%;
height: 100%;
`

const Information = styled.div`

`

const pulseAnimation = keyframes`
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const LoadingContainer = styled.div`
background-color: #333;
color: #fff; 
border-radius: 8px;
overflow: hidden;
position: relative;
width:100%;
height:100%;
aspect-ratio: 1/1.5;
`;

const LoadingAnimation = styled.div`
width: 100%;
height: 100%; 
background-color: #ffa500; 
animation: ${pulseAnimation} 1s infinite alternate;
`;

export default function MovieCard({movie}){

    if (!movie) 
    
    return(
        <LoadingContainer>
            <LoadingAnimation/>
        </LoadingContainer>
    )

    return(
        <Container>
            <Poster />
            <Information>

            </Information>
        </Container>
    )
}