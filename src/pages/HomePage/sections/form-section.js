import { useNavigate } from "react-router-dom"
import styled from "styled-components"


const Container = styled.div`
gap:1rem;
width:100%;
padding:1rem;
display: flex;
align-items: center;
flex-direction: column;
justify-content: center;
`

const Form = styled.form`
gap:1rem;
width:100%;
display: flex;
flex-wrap: wrap;
align-items: center;
justify-content: center;
`
const EmailInput = styled.input`
border-radius: 200px;
padding:.5rem 1rem;
flex:1;
max-width:400px;
height: 40px;
border:none;
outline: none;
min-width: 250px;
font-size: var(--body);

&:focus{
    outline:3px solid var(--main-color);
}
`
const SubmitButton = styled.button`
color:white;
padding:.5rem 1.5rem;
border-radius: 200px;
font-size: var(--body);
background-color: var(--main-color);
&:hover{
    background-color: var(--main-color-dark);
}
`
const Text = styled.h6`
font-size: var(--heading-6);
font-weight:bold;
color:white;
text-align: center;
`
export default function FormSection(){
    const navigate = useNavigate()

    function handleFormSubmit (e){
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        if (formData.get("email"))
        navigate("/login", {state:{"email":formData.get("email")}})
    }

    return(
        <Container>
            <Text>you can’t get this far without joining</Text>
            <Form onSubmit={handleFormSubmit}>
                <EmailInput type="email" name="email"  required={true}/> 
                <SubmitButton>Submit</SubmitButton>
            </Form>
        </Container>
    )
}