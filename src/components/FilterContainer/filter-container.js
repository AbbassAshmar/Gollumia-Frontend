import { useState } from "react";
import FilterHeader from "../FilterHeader/filter-header";
import FilterMenu from "../FilterMenu/filter-menu";


function FilterContainer(props){
    const [isActive, setIsActive] = useState(false)
    return(
        <div>
            <FilterHeader setIsActive={(isActive)=>{setIsActive(isActive)}} isActive={isActive}></FilterHeader>
            <FilterMenu setCurrentPageNumber={props.setCurrentPageNumber}
            setCheckFilter={props.setCheckFilter} start={props.start} 
            setCount={props.setCount} setMovies={props.setMovies} 
            setIsActive={(isActive)=>{setIsActive(isActive)}} 
            isActive={isActive}>
            </FilterMenu>
        </div>
    )
}
export default FilterContainer;