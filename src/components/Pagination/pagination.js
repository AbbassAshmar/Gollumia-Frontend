import styled from "styled-components"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const Container = styled.div`
width:40%;
display:flex;
align-items:center;
margin:2rem auto 2rem auto;
justify-content:center;
background:black;

`
const StyledLink = styled(Link)`
padding:.5rem 1.2rem .5rem 1.2rem;
border-radius:4px;
text-decoration:none;
font-size:1.2rem;
transition: background .2s;
&:hover{
    background:rgba(255,255,255,.3);
}
`

function Pagination(props){
    // get the number of movies of a specific category
    const [pagesNumber, setPagesNumber] = useState(1)
    function request_movies_number(){

    }
    useEffect(()=>{request_movies_number()
    
    },[])
    let nb = 350;
    let nb_pages = 8;

    return(
        <Container>
            
            <StyledLink style={{display:`${props.page_number <= 1 ?"none":"inline-block"}`}}  
            to={`/movies/category/${props.category}?page=${props.page_number -1}`} >
                <i style={{transform:'rotate(180deg)'}} className="fa-solid fa-greater-than"></i>
            </StyledLink>



            <StyledLink style={{display:`${props.page_number-1 <= 1 ?"none":"inline-block"}`}}  
            to={`/movies/category/${props.category}?page=1`}>
                1
            </StyledLink>
             <div style={{margin:"0 .3rem", color:"blue",display:`${props.page_number-1 <= 1 ?"none":"inline-block"}`}} >
                ...
            </div>


            <StyledLink style={{display:`${props.page_number -1>=1 && props.page_number-1 <= nb_pages?"inline-block":"none"}`}} 
            to={`/movies/category/${props.category}?page=${props.page_number-1}`}>
                {props.page_number-1}
            </StyledLink>
            <StyledLink style={{background:"orange",display:`${props.page_number >=1 && props.page_number <= nb_pages?"inline-block":"none"}`}}
             to={`/movies/category/${props.category}?page=${props.page_number}`}>
                {props.page_number}
            </StyledLink>
            <StyledLink style={{display:`${props.page_number +1 >=1 && props.page_number + 1 <= nb_pages?"inline-block":"none"}`}} 
            to={`/movies/category/${props.category}?page=${props.page_number+1}`}>
                {props.page_number+1}
            </StyledLink>
       
            <div style={{margin:"0 .3rem",color:"blue",display:`${props.page_number+1 >= nb_pages ?"none":"inline-block"}`}} >
                ...
            </div>
            <StyledLink style={{display:`${props.page_number+1 >= nb_pages ?"none":"inline-block"}`}} 
            to={`/movies/category/${props.category}?page=${nb_pages}`}>
                {nb_pages}
            </StyledLink>
            
            <StyledLink style={{display:`${props.page_number >= nb_pages ?"none":"inline-block"}`}} 
            to={`/movies/category/${props.category}?page=${props.page_number+1}`} >
                <i className="fa-solid fa-greater-than"></i>
            </StyledLink>
        </Container>
    )
}

export default Pagination;