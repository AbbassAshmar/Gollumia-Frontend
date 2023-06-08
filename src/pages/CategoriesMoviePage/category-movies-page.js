import { useParams,useSearchParams,useLocation } from "react-router-dom"
import Title from "../../components/Category/title";
import CtgMovies from "../../components/Category/movies-by-category"
import Pagination  from "../../components/Pagination/pagination";
import { useEffect, useState } from "react";
import MoviesPagesContainers from "../../components/MoviesPagesContainers/movies-pages-containers";


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
        <MoviesPagesContainers children={
            < >
                <Title veiwall={false} ctg={`All ${category} Movies`}/>
                <Pagination url={getUrl} pagesCount={pagesCount} page_number={pageNumber}/>
                <CtgMovies category={category} page_number={pageNumber} />
                <Pagination url={getUrl} pagesCount={pagesCount} page_number={pageNumber}/>
            </>
        }/>
    )
}

