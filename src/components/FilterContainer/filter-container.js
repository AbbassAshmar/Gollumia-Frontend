import { useState } from "react";
import FilterHeader from "../FilterHeader/filter-header";
import FilterMenu from "../FilterMenu/filter-menu";


function FilterContainer(props){
    const [isActive, setIsActive] = useState(false)
    return(
        <div>
            <FilterHeader setIsActive={(isActive)=>{setIsActive(isActive)}} isActive={isActive}></FilterHeader>
            <FilterMenu 
                setCurrentPageNumber={props.setCurrentPageNumber}
                searchProps={props.searchProps}
                start={props.start} 
                setCount={props.setCount} setMovies={props.setMovies} 
                setIsActive={(isActive)=>{setIsActive(isActive)}} 
                isActive={isActive}
                searchParams={props.searchParams}
                setSearchParamsIfAltered={props.setSearchParamsIfAltered}
            />
        </div>
    )
}
export default FilterContainer;