import styled from "styled-components"
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Container = styled.div`
width:40%;
display:flex;
align-items:center;
margin:2rem auto 2rem auto;
justify-content:center;
background:black;
`
const Page = styled.div`
padding:.5rem 1.2rem .5rem 1.2rem;
color:white;
border-radius:4px;
text-decoration:none;
font-size:1.2rem;
cursor: pointer;
transition: background-color .2s;
&:hover{
    background:rgba(255,255,255,.3);
}
`

export default function Pagination({totalPagesCount}){
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(searchParams.get("page")? parseInt(searchParams.get("page")) : 1);

    function handlePageClick(page){
        setCurrentPage(page)
    }

    useEffect(()=>{
        searchParams.set("page" , currentPage);
        setSearchParams(searchParams);
    }, [currentPage])

    
    useEffect(()=>{
        if (!searchParams.get('page')){
            setCurrentPage(1)
        }else if (parseInt(searchParams.get("page")) >=1){
            setCurrentPage(parseInt(searchParams.get('page')))
        }
    },[searchParams.get("page")])
    
    return(
        <Container>
            <Page onClick={()=>handlePageClick(currentPage - 1)} style={{display:`${currentPage <= 1 ?"none":"inline-block"}`}}>
                <i style={{transform:'rotate(180deg)'}} className="fa-solid fa-greater-than"/>
            </Page>

            <Page onClick={()=>handlePageClick(1)} style={{display:`${currentPage-1 <= 1 ?"none":"inline-block"}`}}>
                1
            </Page>

            <div style={{margin:"0 .3rem", color:"white",display:`${currentPage-1 <= 1 ?"none":"inline-block"}`}} >
                ...
            </div>

            <Page onClick={()=>handlePageClick(1)} style={{display:`${currentPage -1>=1 && currentPage-1 <= totalPagesCount?"inline-block":"none"}`}} >
                {currentPage-1}
            </Page>

            <Page style={{background:"orange",display:`${currentPage >=1 && currentPage <= totalPagesCount?"inline-block":"none"}`}}>
                {currentPage}
            </Page>

            <Page onClick={()=>handlePageClick(currentPage+1)} style={{display:`${currentPage +1 >=1 && currentPage + 1 <= totalPagesCount?"inline-block":"none"}`}}>
                {currentPage+1}
            </Page>
       
            <div style={{margin:"0 .3rem",color:"white",display:`${currentPage+1 >= totalPagesCount ?"none":"inline-block"}`}} >
                ...
            </div>

            <Page onClick={()=>handlePageClick(totalPagesCount)} style={{display:`${currentPage+1 >= totalPagesCount ?"none":"inline-block"}`}}>
                {totalPagesCount}
            </Page>
            
            <Page onClick={()=>handlePageClick(currentPage + 1)} style={{display:`${currentPage >= totalPagesCount ?"none":"inline-block"}`}}>
                <i className="fa-solid fa-greater-than"/>
            </Page>
        </Container>
    )
}

