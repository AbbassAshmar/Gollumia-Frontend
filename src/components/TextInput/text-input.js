import styled from "styled-components";


export const InputContainer = styled.div`
width:100%;
display: flex;
flex-direction: column;
gap: 0.5rem;
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
`
export const Message = styled.p`
font-size:var(--small-1);
color:red;
padding: 0;
`
export default function TextInput({errors, setFormData, formData, name, type}){

    function handleInputChange(e){
        setFormData((prev) => ({...prev, [name] : e.target.value}))
    }

    return (
        <InputContainer>
            <Input $error={errors.error_fields.includes(name)} value={formData[name]} onChange={handleInputChange} type={type} placeholder={name}/>
            {errors.messages[name] && <Message>{errors.messages[name]}</Message>}
        </InputContainer>
    )
}