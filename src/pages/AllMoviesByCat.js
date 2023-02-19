import { useParams } from "react-router-dom"
import App from "../components/Footer";
import MoviesNav from "../components/moviesNavbar";
import styled from "styled-components";
import Category from "../components/Category";
import CtgMovies from "../components/ctgMovies"
const Container = styled.div`
background : black;
width:100%;
`
const MoviesContainer = styled.div`
width :80%;
background:blue;
height:70vh;
margin:auto;

`
function CategorizedMovies(){
    const {category,id} = useParams()
    return(
        <div>
           <MoviesNav/>
           <Container>
            <MoviesContainer>
                <Category ctg={`All ${category} Movies`}/>
                <CtgMovies id={id} ctg={category} />
            </MoviesContainer>
           <App></App>

           </Container>
        </div>
    )
}

export default CategorizedMovies;