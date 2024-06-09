import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Form = styled.form`
width:100%;
position:relative;
`

const TextArea = styled.textarea`
width: 100%;
height: 300px;
max-height:${({$maxHeight}) => $maxHeight};
background-color: white;
padding: 14px 14px 30px 14px;
border-radius: 17px;
transition: height .3s;
overflow: hidden;
resize: none;
position: relative;
outline: none;
border: none;
padding-bottom: 4rem;
transition: max-height 0.3s;
z-index: 2;
scroll-padding: 4rem;

&:focus{
    max-height:300px;
    outline:2px solid var(--main-color);
}

&:focus + button {
    opacity:1;
}
`
const SubmitButton = styled.button`
opacity:${({$opacity}) => $opacity};
z-index:2;

bottom:1rem;
right:1rem;
color:white;
overflow: hidden;
position:absolute;
width:fit-content;
padding:.3rem 1rem;
border-radius: 3000px;
background:var(--main-color);
transition: opacity .3s;
transition-delay: .3s;
`

export default function InputField({setCommentsReplies, setCommentsRepliesCount}){
    const { id } = useParams()    
    const [cookies, setCookies] = useCookies();
    const [isLoading, setIsLoading] = useState(false);
    const [text, setText] = useState("");

    let navigate = useNavigate();

    function handleFormSubmit(e){
        e.preventDefault();

        if (!cookies.token){
            navigate('/login');
        }

        const formData = new FormData(e.currentTarget);
        let text = formData.get('text')?.trim();

        if (text&& text.length > 0){
            requestCreateComment(text,id)
        }
    }

    async function requestCreateComment(text,movieID){
        setIsLoading(true);

        const URL =`${process.env.REACT_APP_API_URL}/api/comments/`;
        const payload = {
            text : text,
            movie : movieID,
        }
        const INIT = {
            method:"POST",
            body : JSON.stringify(payload),
            headers : {
                'Authorization' : "Token " + cookies.token,
                'content-type' :'application/json'
            }
        }

        const request = await fetch(URL,INIT);
        const response = await request.json();

        if(request?.status == 201){
            setCommentsReplies((prev) => {return [response.data.comment, ...prev]});
            setCommentsRepliesCount(response.metadata.comments_replies_count)
            setText("");
        }

        if(request?.status == 401){
            navigate('/login')
        }

        setIsLoading(false);
    }

    return(
        <Form onSubmit={handleFormSubmit}>
            <TextArea 
            $maxHeight={text.length > 0 ? '300px' : '60px'} 
            value={text} 
            onChange={(e)=>setText(e.currentTarget.value)} 
            name="text" placeholder="New comment..."/>

            <SubmitButton 
            $opacity={text.length > 0 ? '1' : '0'}
            disabled={isLoading} 
            type='submit'>
                Comment
            </SubmitButton>
        </Form>
    )
}