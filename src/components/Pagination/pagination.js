import styled from "styled-components"
import { Link } from "react-router-dom";
const Container = styled.div`
width:30%;
background:yellow;
margin:auto;
`
function Pagination(props){
    let nb = 350;
    let nb_pages = 4;

    return(
        <Container>
            <Link style={{display:`${props.page_number-2>=1 && props.page_number -2 <= nb_pages?"inline-block":"none"}`}} to={`/movies/category/${props.category}?page=${props.page_number}`} >
                {props.page_number-2}
            </Link>
            <Link style={{display:`${props.page_number -1>=1 && props.page_number-1 <= nb_pages?"inline-block":"none"}`}} to={`/movies/category/${props.category}?page=${props.page_number-1}`}>
                {props.page_number-1}
            </Link>
            <Link style={{background:"red",display:`${props.page_number >=1 && props.page_number <= nb_pages?"inline-block":"none"}`}} to={`/movies/category/${props.category}?page=${props.page_number}`}>
                {props.page_number}
            </Link>
            <Link style={{display:`${props.page_number +1 >=1 && props.page_number + 1 <= nb_pages?"inline-block":"none"}`}} to={`/movies/category/${props.category}?page=${props.page_number+1}`}>
                {props.page_number+1}
            </Link>
            <Link style={{display:`${props.page_number +2 >=1 && props.page_number + 2<= nb_pages?"inline-block":"none"}`}} to={`/movies/category/${props.category}?page=${props.page_number+2}`}>
                {props.page_number+2}
            </Link>
        </Container>
    )
}

export default Pagination;