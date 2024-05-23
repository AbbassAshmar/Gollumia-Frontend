import styled from "styled-components";

const Container = styled.div`
font-family: 'Kanit', sans-serif;
color:orange;
font-weight:700;
font-size:1.5rem;
margin:0 0 0 0;
`



export default function Logo({style}){
    return (
        <Container style={style}>
            AFLIX
        </Container>
    )
}