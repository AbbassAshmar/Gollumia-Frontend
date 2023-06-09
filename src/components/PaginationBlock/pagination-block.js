import { useEffect, useState } from "react"
import { useLocation,useSearchParams } from "react-router-dom"
import Pagination from "../Pagination/pagination"

function PaginationBlock(props){

    const [searchParams, setSearchParams] = useSearchParams()
    const [currentPageNumber, setCurrentPageNumber] =useState(searchParams.get("page")?searchParams.get("page"):1)
    const location = useLocation()
 
    useEffect(()=>{
        props.request_movies(currentPageNumber) 
    },[currentPageNumber])
   
    useEffect(()=>{
        if (searchParams.get("page") && searchParams.get("page") >=1){
            setCurrentPageNumber(parseInt(searchParams.get("page")))
        }
    },[location.search])
    
    function getUrl(currentPageNumber){
        return `${props.url}/?page=${currentPageNumber}`
    }

    return (
        <>
            <Pagination url={getUrl} pagesCount={props.pagesCount} page_number={currentPageNumber}/>
                {props.children}
            <Pagination url={getUrl} pagesCount={props.pagesCount} page_number={currentPageNumber}/>
        </>
    )
}

export default PaginationBlock;