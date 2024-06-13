import styled from "styled-components";
import Title from '../../../Title/title';

const Filter = styled.button`
background:var(--main-color);
display:flex;
align-items:start;
border-radius:4px;
gap:.5rem;
padding:.25rem .75rem;
font-weight:bold;
color:white;
&:hover{
    background-color: var(--main-color-dark);
}
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
            <Title text={title}/>
            <Filter onClick={handleFilterClick}>
                <i style={{margin:"2px 0 0 0",transform:`rotate(${isActive?"180deg":"0"})`}} className="fa-solid fa-sort-down"/>
                <p style={{margin:"0"}}>Filter</p>
            </Filter>
        </Container>

    )
}

export default FilterHeader;