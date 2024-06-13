import { useState } from "react";
import styled from "styled-components";

const Container  = styled.div`
display:flex;
align-items:center;
width:100%;
padding: 2rem 0;
border-bottom:2px solid grey;

@media screen and (max-width:600px){
    flex-direction:column;
    align-items:flex-start;
    gap:10px;
    padding-bottom:20px;
    padding-top:20px;
}
`
const Title = styled.p`
flex:1;
margin:0;
min-width:100px;
color:white;
font-weight:800;
`
const Elements = styled.div`
flex:8;
`

const Element = styled.label`
background-color: ${({$checked}) => $checked ? "orange" : "transparent"};
display: inline-block;
padding:.5rem 1rem;
cursor:pointer;
border-radius: 6px;
&:hover{
    background-color: orange;
}

`
const ElementContent = styled.div`
gap: 0.5rem;
width:100%;
cursor:pointer;
display: flex;
align-items: center;
justify-content:center;
`
const Input = styled.input`
margin:0;
width: 17px;
cursor:pointer;
`
const Value = styled.p`
font-size:.9rem;
color:white;
margin:0;
font-weight:800;
cursor:pointer;
`
export default function FilterElementWrapper({title, list, name,valueKey}){
    const [checkedRadio, setCheckedRadio] = useState('');

    function handleInputChange(value) {
        console.log(checkedRadio)
        if (value == checkedRadio)
        setCheckedRadio(null); 
    }
    return(
        <Container>
            <Title>{title}</Title>
            <Elements>
                {[...list,{[valueKey]: "All"}].map((element,index)=>(
                    <Element onClick={() => handleInputChange(element[valueKey])}  $checked={checkedRadio == element[valueKey]} htmlFor={`${name}-${element[valueKey]}`} key={index}>
                        <ElementContent>
                            <Input onChange={()=> setCheckedRadio(element[valueKey])} checked={checkedRadio == element[valueKey]} id={`${name}-${element[valueKey]}`} type="radio" name={name} value={element[valueKey]}></Input>
                            <Value>{element.name}</Value>
                        </ElementContent>
                    </Element> 
                ))}
            </Elements>
        </Container>
    )

}

