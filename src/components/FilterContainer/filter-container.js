import { useState } from "react";
import FilterHeader from "../FilterHeader/filter-header";
import FilterMenu from "../FilterMenu/filter-menu";


function FilterContainer({title}){
    const [isActive, setIsActive] = useState(false)
    return(
        <div>
            <FilterHeader 
                setIsActive={setIsActive} 
                isActive={isActive}
                title={title}
            />
            <FilterMenu 
                setIsActive={setIsActive} 
                isActive={isActive}
            />
        </div>
    )
}
export default FilterContainer;