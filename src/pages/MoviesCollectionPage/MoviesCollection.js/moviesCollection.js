import App from "../../../components/Footer/Footer";
import MoviesNav from "../../../components/MainNavbar/moviesNavbar";
import styled from "styled-components";
import { MoviesContainer,Main } from "../../CategoriesMoviePage/AllMoviesByCat";
import Pagination from "../../../components/Pagination/pagination";
import MoviesCollectionComp from "../../../components/MoviesCollectionComponent/MoviesCollectionComponent";
import FilterHeader from "../../../components/FilterHeader/filterheader";
import FilterContainer from "../../../components/FilterContainer/filtercontainer";


function MoviesCollection(){

    return(
        <div style={{background:"black"}}>
            <MoviesNav/>
            <Main>
                <MoviesContainer>
                    {/* request should cantain start?limit?filters? */}
                    <FilterContainer />
                    <Pagination category={"latest"} page_number={1}/>
                    <MoviesCollectionComp />
                    <Pagination category={"latest"} page_number={1}/>
                </MoviesContainer>
            </Main>
            <div>
                <App/>
            </div>


        </div>
    )
}

export default MoviesCollection;