import { useState } from "react";
import FilterHeader from "./components/FilterHeader/filter-header";
import FilterMenu from "./components/FilterMenu/filter-menu";
import styled from "styled-components";


const Container = styled.div`
gap:2rem;
display:flex;
flex-direction: column;
`
export default function Filter({title}){
    const [isActive, setIsActive] = useState(false)
    return(
        <Container>
            <FilterHeader 
                setIsActive={setIsActive} 
                isActive={isActive}
                title={title}
            />
            <FilterMenu 
                setIsActive={setIsActive} 
                isActive={isActive}
            />
        </Container>
    )
}
