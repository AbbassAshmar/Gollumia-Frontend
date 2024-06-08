import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Form = styled.form`
width:100%;
position:relative;
padding-top:1.5rem;
`
const TextArea = styled.textarea`
width: 100%;
height: 200px;
background-color: white;
padding: 14px 14px 30px 14px;
border-radius: 17px;
transition: height .3s;
overflow: hidden;
resize: none;
position: relative;
outline: none;
border: none;
transition: max-height 0.3s;
z-index: 2;
padding-bottom: 4rem;
scroll-padding: 4rem;

&:focus{
    outline:2px solid var(--main-color);
}
`
const SubmitButton = styled.button`
opacity:1;
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
`

export default function ReplyInputField({replyingTo,parentComment,movie, setCommentsReplies, setCommentsRepliesCount, setShow}){
    const [isLoading , setIsLoading] = useState(false);
    const [cookies, setCookies] = useCookies();
    let navigate = useNavigate();

    function handleFormSubmit(e){
        e.preventDefault();

        if (!cookies.token){
            navigate('/login');
        }

        const formData = new FormData(e.currentTarget);
        let text = formData.get('text')?.trim();

        if (text&& text.length > 0){
            requestCreateReply(text,parentComment,replyingTo,movie)
        }
    }

    async function requestCreateReply(text,parentComment,replyingTo,movie){
        setIsLoading(true);

        const URL =`${process.env.REACT_APP_API_URL}/api/replies/`;
        const payload = {
            text : text,
            parent_comment : parentComment,
            replying_to : replyingTo,
            movie : movie,
        }
        const INIT = {
            method:"POST",
            body : JSON.stringify(payload),
            headers : {
                'Authorization' : "Token " + cookies.token,
                'content-type' : 'application/json'
            }
        }

        const request = await fetch(URL,INIT);
        const response = await request.json();

        if(request?.status == 201){
            setCommentsReplies((prev) => {
                let parentCommentOfNewReply = prev.findIndex(comment => comment.id == parentComment);
                prev[parentCommentOfNewReply].replies.push(response.data.reply);
                return prev;
            })
            setCommentsRepliesCount(response.metadata.comments_replies_count)
            setShow(false)
        }

        if(request?.status == 401){
            navigate('/login')
        }

        setIsLoading(false);
    }

    return(
        <Form onSubmit={handleFormSubmit}>
            <TextArea name="text" placeholder="Write your reply..."/>
            <SubmitButton>reply</SubmitButton>
        </Form>
    )
}