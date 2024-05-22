import styled from "styled-components";

const Form = styled.form`
width:100%;
`

const TextArea = styled.textarea`
width: 100%;
height: 10vh;
background-color: white;
padding: 14px 14px 30px 14px;
border-radius: 17px;
transition: height .3s;
overflow: hidden;
resize: none;
position: relative;
outline: none;
border: none;
transition: all 0.3s;
z-index: 2;
`
export default function InputField(){
    return(
        <Form>
            <TextArea />
        </Form>
    )
}