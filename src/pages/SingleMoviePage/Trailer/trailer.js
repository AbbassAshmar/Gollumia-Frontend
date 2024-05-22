import ReactPlayer from "react-player";
import styled from "styled-components";

const Container = styled.div`

`

export default function Trailer (props){
    return (
        <Container>
            {/* <iframe className={styles.movieTrailer} src={state.trailer} title="Rick and Morty Season 4 - Official Trailer" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
            <ReactPlayer style={{margin:"auto"}} url={props.trailer} light={props.thumbnail? props.thumbnail:true}/>
        </Container>
    )
}
