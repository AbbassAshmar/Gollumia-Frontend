import { useParams,useSearchParams,useLocation } from "react-router-dom"
import App from "../../components/Footer/Footer";
import MoviesNav from "../../components/MainNavbar/moviesNavbar";
import styled from "styled-components";
import Category from "../../components/Category/Category";
import CtgMovies from "../../components/Category/ctgMovies"
import Pagination  from "../../components/Pagination/pagination";
import { useEffect, useState } from "react";
export const Main = styled.div`
background : black;
width:100%;
`
export const MoviesContainer = styled.div`
width :97%;
background:black;
margin:auto;
padding-top:1rem;

`
export function CategorizedMovies(){
    const {category} = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const [pageNumber, setPageNumber] =useState(searchParams.get("page")?searchParams.get("page"):1)
    const [pagesCount , setPagesCount] = useState(1)
    const location = useLocation()

    function getUrl(pageNumber){
        return `/movies/category/${category}?page=${pageNumber}`
    }
    async function request_movies_number(){
        let request_count_by_category = await fetch(`http://localhost:8000/api/movies/count/?category=${category}`);
        let count_by_category = await request_count_by_category.json();
        if( request_count_by_category.status == 200 ){
            if (count_by_category['movies_count'] > 0){
                setPagesCount(Math.ceil(count_by_category['movies_count'] / 35))
            }
        }
    }
    useEffect(()=>{
        request_movies_number()
    },[])


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
                    <Category veiwall={false} ctg={`All ${category} Movies`}/>
                    <Pagination url={getUrl} pagesCount={pagesCount} page_number={pageNumber}/>
                    <CtgMovies category={category} page_number={pageNumber} />
                    <Pagination url={getUrl} pagesCount={pagesCount} page_number={pageNumber}/>
                </MoviesContainer>
           </Main>
           <div style={{background:"black"}}> 
            <App></App>
           </div>
        </div>
    )
}

