import Title from "../Title/title";
import styled from "styled-components";

const Filter = styled.button`
    background:orange;
    display:flex;
    align-items:start;
    border-radius:2px;
    gap:3px;
    padding:2px 7px 2px 7px;

`
const Container = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
`

function FilterHeader({isActive, setIsActive, title}){
    function handleFilterClick(){
        setIsActive(!isActive)
    }

    return(
        <Container>
            <Title ctg={title}/>
            <Filter onClick={handleFilterClick}>
                <i style={{margin:"2px 0 0 0",transform:`rotate(${isActive?"180deg":"0"})`}} className="fa-solid fa-sort-down"/>
                <p style={{margin:"0"}}>Filter</p>
            </Filter>
        </Container>

    )
}

export default FilterHeader;