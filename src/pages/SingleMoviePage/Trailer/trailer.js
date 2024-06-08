import { useEffect } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";

const Container = styled.div`
width:100%;
display: flex;
align-items: center;
justify-content: center;
`
const Wrapper = styled.div`
width:70%;
aspect-ratio: 16 / 9;
border-radius: 8px;
overflow: hidden;
@media screen and (max-width:800px) {
    width:100%;
}
`
const Video = styled(ReactPlayer)`
height:auto;
border-radius: 8px;
`

export default function Trailer ({trailer,thumbnail,title}){
    return (
        <Container>
            {/* <Video src={trailer} title={title+ " Trailer"} allowFullScreen/> */}
            <Wrapper>
                <Video 
                width="100%"
                height="100%"
                url={trailer}
                light={thumbnail || true}
                playing
                controls />
            </Wrapper>
        </Container>
    )
}
