import { useParams,useSearchParams,useLocation } from "react-router-dom"
import App from "../../components/Footer/Footer";
import MoviesNav from "../../components/MainNavbar/moviesNavbar";
import styled from "styled-components";
import Category from "../../components/Category/Category";
import CtgMovies from "../../components/Category/ctgMovies"
import Pagination  from "../../components/Pagination/pagination";
import { useEffect, useState } from "react";
const Main = styled.div`
background : black;
width:100%;
`
const MoviesContainer = styled.div`
width :97%;
background:black;
margin:auto;
padding-top:1rem;

`
function CategorizedMovies(){
    const {category} = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const [pageNumber, setPageNumber] =useState(searchParams.get("page")?searchParams.get("page"):1)
    const location = useLocation()

    // update the state of the page number (searchParam) on location change
    useEffect(()=>{
        if (searchParams.get("page") && searchParams.get("page") >=1){
        setPageNumber(parseInt(searchParams.get("page")))}
    },[location.search])
    return(
        <div style={{background:"black"}}>
            <MoviesNav/>
            <Main>
                <MoviesContainer>
                    <Category ctg={`All ${category} Movies`}/>
                    <Pagination category={category} page_number={pageNumber}/>
                    <CtgMovies category={category} page_number={pageNumber} />
                    <Pagination category={category} page_number={pageNumber}/>
                </MoviesContainer>
           </Main>
           <div style={{background:"black"}}> 
            <App></App>
           </div>
        </div>
    )
}

export default CategorizedMovies;