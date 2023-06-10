import FilterElement from "../FilterElements/filter-elements";
import styled from "styled-components";

const Container  = styled.div`
    display:flex;
    align-items:center;
    width:100%;
    min-height:10vh;
    border-bottom:2px solid white;
`
const Elements = styled.div`
    display:grid;
    grid-template-columns: repeat(auto-fill ,minmax(107px,auto));
    flex:7;
`
const Title = styled.p`
margin:0;
width:120px;
color:white;
font-weight:800;

`
function FilterElementWrapper(props){
    let id =0;
    return(
        <Container>
            <Title>{props.title}</Title>
            <Elements>
                {props.list.map((element)=>{
                    return <FilterElement 
                    key={id++}
                    label={element} 
                    name={props.name} 
                    value={element}/>
                })}
            </Elements>
        </Container>
    )

}

export default FilterElementWrapper;