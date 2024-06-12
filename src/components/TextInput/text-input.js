import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
width:100%;
display: flex;
flex-direction: column;
gap: .5rem;
`

const OuterLabel = styled.label`
color:${({$focus,$error}) => $error ? "red" : $focus ? "var(--main-color)" : "grey"};
font-size:1rem;
`

export const InputContainer = styled.div`
width:100%;
position: relative;
`
export const Input = styled.input`
width:100%;
border-radius:5px;
height:45px;
border :none;
background:none;
border:${({$error}) => $error ? '2px solid red' : '2px solid grey'};
outline:none;
color:white;
padding:.5rem 1rem;
&:focus{
    border:2px solid var(--main-color);
    color:var(--main-color);
}
&:focus + label{
    top:0;
    color:var(--main-color);
    font-size: 12px;
}
`
export const Message = styled.p`
font-size:var(--small-1);
color:red;
padding: 0;
`

const InnerLabel = styled.label`
left:1rem;
position:absolute;
background-color: black;
font-size:var(--small-1);
transform: translateY(-50%);
top:${({$up}) => $up ? '0' : "50%"};
font-size:${({$up}) => $up ? '12px' : "14px"};
color:${({$error}) => $error ? "red" : "grey"};
transition: top .3s, font-size .3s, color .3s;
`
export default function TextInput({errors, setFormData, formData, name, type, label=null, placeholder=null}){
    const [inputFocus, setInputFocus] = useState(false)

    function handleInputChange(e){
        setFormData((prev) => ({...prev, [name] : e.target.value}))
    }

    return (
        <Container>
            {label === "outer" &&(
                <OuterLabel $error={errors.error_fields.includes(name)} $focus={inputFocus}>{name.replace("_"," ")}</OuterLabel>
            )}
            <InputContainer>
                <Input onBlur={()=>setInputFocus(false)} onFocus={()=>setInputFocus(true)} $error={errors.error_fields.includes(name)} value={formData[name]} onChange={handleInputChange} type={type} placeholder={placeholder}/>
                {label === "inner" && (
                    <InnerLabel $error={errors.error_fields.includes(name)} $up={formData[name] || false}>{name.replace("_"," ")}</InnerLabel>
                )}
            </InputContainer>
            {errors.messages[name] && <Message>{errors.messages[name]}</Message>}
        </Container>
    )
}