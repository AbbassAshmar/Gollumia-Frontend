import { useState } from "react";
import FilterHeader from "../FilterHeader/filterheader";
import FilterMenu from "../FilterMenu/filtermenu";


function FilterContainer(props){
    const [isActive, setIsActive] = useState(false)
    return(
        <div>
            <FilterHeader  setIsActive={(isActive)=>{setIsActive(isActive)}} isActive={isActive}></FilterHeader>
            <FilterMenu setCount={props.setCount} setMovies={props.setMovies} setIsActive={(isActive)=>{setIsActive(isActive)}} isActive={isActive}></FilterMenu>
        </div>
    )
}
export default FilterContainer;