import styled from "styled-components";

const Container = styled.div`
display:flex;
align-items:center;
gap:3px;
justify-content:start;
`
const Label = styled.label`
font-size:.9rem;
color:white;
margin:0;
font-weight:800;
`
const Input = styled.input`
margin:0;
width: 17px;
`

function FilterElement(props){
    return (
        <Container>
            <Input type="radio" name={props.name} value={props.value}></Input>
            <Label>{props.label}</Label>
        </Container>
    )
}

export default FilterElement;