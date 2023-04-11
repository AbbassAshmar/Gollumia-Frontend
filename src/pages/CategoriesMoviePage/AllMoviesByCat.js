import { useParams } from "react-router-dom"
import App from "../../components/Footer/Footer";
import MoviesNav from "../../components/MainNavbar/moviesNavbar";
import styled from "styled-components";
import Category from "../../components/Category/Category";
import CtgMovies from "../../components/Category/ctgMovies"

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