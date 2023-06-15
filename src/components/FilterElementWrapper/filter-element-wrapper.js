import FilterElement from "../FilterElements/filter-elements";
import styled from "styled-components";

const Container  = styled.div`
    display:flex;
    align-items:center;
    width:100%;
    min-height:10vh;
    border-bottom:1px solid white;
    
    @media screen and (max-width:600px){
        flex-direction:column;
        align-items:flex-start;
        gap:10px;
        padding-bottom:20px;
        padding-top:20px;
    }
`
const Elements = styled.div`
    display:grid;
    grid-template-columns: repeat(auto-fill ,minmax(107px,auto));
    flex:7;

    @media screen and (max-width:600px){
        width:100%;
    }
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