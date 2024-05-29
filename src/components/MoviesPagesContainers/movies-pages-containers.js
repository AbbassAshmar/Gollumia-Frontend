import styled from "styled-components";

const Main = styled.div`
background : black;
width:100%;
`
const MoviesContainer = styled.div`
width :100%;
background:black;
margin:auto;
padding:2rem;

@media screen and (max-width:800px){
    padding : 1rem;
}
`

function MoviesPagesContainers({children}){
    return (
        <Main>
            <MoviesContainer>
                {children}
            </MoviesContainer>
        </Main>
    )
}

export default MoviesPagesContainers;  