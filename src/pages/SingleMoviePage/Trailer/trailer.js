import { useEffect } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";

const Container = styled.div`
width:100%;
display: flex;
align-items: center;
justify-content: center;
`
const Video = styled(ReactPlayer)`
width:100%;
aspect-ratio: 16 / 9;
`

export default function Trailer ({trailer,thumbnail,title}){
    useEffect(()=>{console.log(trailer)},[trailer])
    return (
        <Container>
            {/* <Video src={trailer} title={title+ " Trailer"} allowFullScreen/> */}
            <Video 
            width="100%"
            height="100%"
            url={trailer}
            light={thumbnail || true}
            playing
            controls />
        </Container>
    )
}
