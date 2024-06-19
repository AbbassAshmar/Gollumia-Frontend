import styled from "styled-components"

const Container = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
`
const Wrapper = styled.div`
width:100%;
overflow: hidden;
border-radius: 8px;
aspect-ratio: 16 / 9;
box-shadow: 0px 0px 40px rgba(255, 165, 0,0.7);
`
const Iframe = styled.iframe`
width:100%;
height:100%;
`

export default function MoviePlayer({url}){
    return(
        <Container>
            <Wrapper>
                <Iframe src={url} allowFullScreen />
            </Wrapper>
        </Container>
    )
}