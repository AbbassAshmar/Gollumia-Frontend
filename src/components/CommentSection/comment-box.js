import styled from "styled-components";
import ProfilePicture from "../ProfilePicture/profile-picture";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import ReplyInputField from "./reply-input-field";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
gap:1rem;
width:100%;
display: flex;
align-items: flex-start;
`
const UserProfilePicture = styled.div`
width:57px;
height:57px;
border-radius:17px;
display: flex;
align-items: center;
justify-content: center;
font-size: 2rem;
`
const Picture = styled.img`
width:100%;
height:100%;
object-fit: cover;
border-radius:17px;
`
const LetterProfile = styled.div`
width:100%;
height:100%;
display:flex;
align-items:center;
justify-content: center;
border-radius:17px;
background:orange;
`
const Content = styled.div`
width: 100%;
gap:.5rem;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;
`
const DetailsContainer = styled.div`
width:100%;
display: flex;
align-items:flex-start;
justify-content: space-between;
`
const NameAndDate= styled.div`
gap:.25rem;
display: flex;
flex-direction: column;
align-items: flex-start;
`
const Names = styled.div`
display: flex;
gap:1rem;
`
const Username = styled.div`
color:orange;
font-size:1rem;
`
const UserNameReplyingTo = styled.div`
font-size:14px;
`
const CreatedAt = styled.div`
color:#A8AAAE;
font-size:14px;
`
const ActionsContainer = styled.div`
color:white;
position:relative;
`
const ActionsList = styled.div`
right:0;
top: 115%;
z-index: 3;
overflow: hidden;
width: fit-content;
position: absolute;
transition: max-height .3s;
max-height: ${({show})=> show ? "20vh" : "0"};
`
const ActionsOption = styled.div`
gap:.5rem;
color:white;
display: flex;
font-size:14px;
cursor: pointer;
align-items: center;
padding: .75rem 1.25rem;
background-color: black;
border: 2px solid #878787;
justify-content: flex-start;
&:first-child{
    border-radius: 8px 8px 0 0;
}
&:last-child{
    border-top:none;
    border-radius:  0 0 8px 8px;
}
&:hover{
    background:#878787;
}
`
const TextContainer = styled.p`
gap:.5rem;
color:white;
margin:0;
padding:0;
width:100%;
word-break: break-all;
white-space: normal;
`
const InteractionsContainer = styled.div`
gap:1rem;
display: flex;
align-items: center;
`
const LikeDislikeButton = styled.button`
gap:.5rem;
color:white;
display:flex;
font-size: 14px;
align-items: center;
`
const ReplyButton= styled.div`
color:white;
font-size:14px;
cursor: pointer;
`

const EditTextForm = styled.form`
width:100%;
position:relative;
`
const EditTextInput = styled.textarea`
width:100%;
height:100%;
background: black;
outline:none;
border:none;
overflow:hidden;
max-height:300px;
background:white;
height:250px;
color:black;
padding:1rem;
resize:none;
padding-bottom:4rem;
scroll-padding: 4rem;
border-radius:8px;
`
const EditTextButtons = styled.div`
display: flex;
gap:1rem;
align-items:center;
position:absolute;
bottom:1rem;
right:1rem;
z-index:2;
`
const EditTextSubmitButton = styled.button`
color:white;
width:fit-content;
padding:.3rem 1rem;
border-radius: 3000px;
background:var(--main-color);
`
const EditTextCancelButton = styled.button`
color:black;
width:fit-content;
padding:.3rem 1rem;
border-radius: 3000px;
background:white;
`
export default function CommentBox({text, user, createdAt, interaction,  likes, dislikes, id, movie, isReply, replyingTo, parentComment,setCommentsReplies, setCommentsRepliesCount}){
    const [currentInteraction, setCurrentInteraction] = useState({type:0, likes_count : 0, dislikes_count : 0});
    

    const [showActionsList, setShowActionsList] = useState(false);
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [showEditTextForm, setShowEditTextForm] = useState(false);

    const [cookies] = useCookies()
    const navigate = useNavigate();
    
    useEffect(()=>{
        if (interaction != undefined)
            setCurrentInteraction({
                type: interaction, 
                likes_count: likes, 
                dislikes_count: dislikes
            });
    },[interaction,likes,dislikes])

    async function requestDeleteCommentOrReply(id, isReply, token){
        const URL =`${process.env.REACT_APP_API_URL}/api/${isReply ? "replies" :"comments"}/${id}`;
        const INIT = {
            method:"DELETE",
            headers : {
                'Authorization' : "Token " + token,
            }
        }

        const request = await fetch(URL , INIT);
        const response = await request.json();

        if (request.status === 200){
            setCommentsRepliesCount(response.metadata.comments_replies_count);
            setCommentsReplies((prev)=>{
                if (isReply){
                    let parentCommentIndex = prev.findIndex((comment) => comment.id == parentComment);
                    prev[parentCommentIndex].replies = prev[parentCommentIndex].replies.filter((reply) => reply.id != id);
                }else{
                    prev = prev.filter((comment) => comment.id != id);
                }

                return [...prev];
            });
        }

        if (request.status === 401){
            navigate("/login")
        }
    }

    async function requestEditCommentOrReply(id, isReply, new_text,token){
        const URL =`${process.env.REACT_APP_API_URL}/api/${isReply ? "replies" :"comments"}/${id}`;
        const payload = {text : new_text}
        const INIT = {
            method:"PATCH",
            body : JSON.stringify(payload),
            headers : {
                'Authorization' : "Token " + token,
                'content-type' : 'application/json'
            }
        }

        const request = await fetch(URL , INIT);
        const response = await request.json();

        if (request.status === 200){
            setShowEditTextForm(false);
            setCommentsReplies((prev)=>{
                if (isReply){
                    let parentCommentIndex = prev.findIndex((comment) => comment.id == parentComment);
                    prev[parentCommentIndex].replies.map((reply) =>{
                        if (reply.id == id) reply.text = new_text;
                        return reply
                    })
                }else{
                    let editedCommentIndex = prev.findIndex((comment) => comment.id == id);
                    prev[editedCommentIndex].text = new_text;
                }

                return [...prev];
            });
        }

        if (request.status === 401){
            navigate("/login")
        }
    }

    async function requestLikeCommentOrReply(isReply, id, token){
        const resource = isReply?"replies" : "comments";
        const URL =`${process.env.REACT_APP_API_URL}/api/${resource}/${id}/likes/`;

        const INIT = {
            method:"POST",
            headers : {
                'Authorization' : "Token " + token,
                'content-type' : 'application/json'
            }
        }

        const request = await fetch(URL, INIT);
        const response = await request.json();

        if (request.status == 200){
            if (response.data.action == "like added") 
                setCurrentInteraction({
                    type: 1, 
                    likes_count: response.metadata.likes_count, 
                    dislikes_count:response.metadata.dislikes_count
                });

            else setCurrentInteraction({
                type: 0, 
                likes_count: response.metadata.likes_count, 
                dislikes_count:response.metadata.dislikes_count
            });
        }

        if (request.status == 401){
            navigate("/login");
        }
    }

    async function requestDislikeCommentOrReply(isReply, id, token){
        const resource = isReply?"replies" : "comments";
        const URL =`${process.env.REACT_APP_API_URL}/api/${resource}/${id}/dislikes/`;

        const INIT = {
            method:"POST",
            headers : {
                'Authorization' : "Token " + token,
                'content-type' : 'application/json'
            }
        }

        const request = await fetch(URL, INIT);
        const response = await request.json();

        if (request.status == 200){
            if (response.data.action == "dislike added")
                setCurrentInteraction({
                    type: 2, 
                    likes_count: response.metadata.likes_count, 
                    dislikes_count:response.metadata.dislikes_count
                });

            else setCurrentInteraction({
                type: 0, 
                likes_count: response.metadata.likes_count, 
                dislikes_count:response.metadata.dislikes_count
            });

        }

        if (request.status == 401){
            navigate("/login");
        }
    }


    function handleLikeButtonClick(e){
        requestLikeCommentOrReply(isReply, id, cookies.token);
    }

    function handleDislikeButtonClick(e){
        requestDislikeCommentOrReply(isReply, id, cookies.token);

    }

    function handleReplyButtonClick(e){
        setShowReplyInput(true);
    }

    function handleEllipsisClick(e){
        setShowActionsList(!showActionsList);
    }

    function handleEditActionClick(e){
        setShowEditTextForm(true);
    }

    function handleDeleteActionClick(e){
        requestDeleteCommentOrReply(id, isReply, cookies.token);
    }

    function handleEditTextFormSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let new_text= formData.get("newText")?.trim();
        if (!new_text) return;

        requestEditCommentOrReply(id, isReply, new_text, cookies.token);
    }
    
    function handleEditTextCancelClick(e){
        setShowEditTextForm(false);
    }

    function formatCreatedAt(createdAt) {
        const now = new Date();
        const createdDate = new Date(createdAt);
        const diffMs = now - createdDate;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
        const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);
    
        if (diffDays > 30) {
            return createdDate.toLocaleDateString('en-GB');  // Format as dd-mm-yyyy
        } else if (diffDays >= 1) {
            return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        } else if (diffHours >= 1) {
            return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        } else if (diffMinutes >= 1) {
            return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
        } else {
            return 'just now';
        }
    }

    return(
        <Container>
            <UserProfilePicture>
                {user.pfp && user.pfp != 'null' ? 
                <Picture src={user.pfp} alt={`${user.id}-profile`}/>:
                <LetterProfile>{user.username[0].toUpperCase()}</LetterProfile>} 
            </UserProfilePicture>
            <Content>
                <DetailsContainer>
                    <NameAndDate>
                        <Names>
                            <Username>{user.username}</Username>
                            {isReply && replyingTo && (
                                <div style={{display:"flex",gap:'.5rem',alignItems:"center",color:"#A8AAAE"}}>
                                    <i style={{rotate:"y 180deg"}} className="fa-solid fa-reply" />
                                    <UserNameReplyingTo>{replyingTo.user.username}</UserNameReplyingTo>
                                </div>
                            )}
                        </Names>
                        <CreatedAt>{formatCreatedAt(createdAt)}</CreatedAt>
                    </NameAndDate>
                    {cookies?.id && parseInt(cookies.id) === user.id && (
                        <ActionsContainer>
                            <i style={{color:"white",cursor:'pointer'}} onClick={handleEllipsisClick} className="fa-solid fa-ellipsis-vertical"/>
                            <ActionsList show={showActionsList}>
                                <ActionsOption onClick={handleEditActionClick}>
                                    <span>Edit</span>
                                    <i className="fa-solid fa-pen-to-square"/>
                                </ActionsOption>
                                <ActionsOption onClick={handleDeleteActionClick}>
                                    <span>Delete</span>
                                    <i className="fa-solid fa-trash"/>                                
                                </ActionsOption>
                            </ActionsList>
                        </ActionsContainer>
                    )}
                </DetailsContainer>

                {showEditTextForm ? (
                    <EditTextForm onSubmit={handleEditTextFormSubmit}>
                        <EditTextInput
                        name="newText" 
                        type="text" 
                        contenteditable={true}
                        autoFocus
                        defaultValue={text}
                        />
                        <EditTextButtons>
                            <EditTextCancelButton type="button" onClick={handleEditTextCancelClick}>Cancel</EditTextCancelButton>
                            <EditTextSubmitButton type="submit">Apply Edit</EditTextSubmitButton>
                        </EditTextButtons>
                    </EditTextForm>
                ) : (
                    <TextContainer>
                        {text}
                    </TextContainer>
                )}

                <InteractionsContainer>
                    <LikeDislikeButton onClick={handleLikeButtonClick}>
                        <i className={`fa-${currentInteraction.type == 1 ? "solid" : "regular"} fa-thumbs-up`}/>
                        <span>{currentInteraction.likes_count}</span>
                    </LikeDislikeButton>
                    <LikeDislikeButton onClick={handleDislikeButtonClick}>
                        <i className={`fa-${currentInteraction.type == 2 ? "solid" : "regular"} fa-thumbs-down`}/>
                        <span>{currentInteraction.dislikes_count}</span>
                    </LikeDislikeButton>
                    <ReplyButton onClick={handleReplyButtonClick}>Reply</ReplyButton>
                </InteractionsContainer>

                {showReplyInput && !isReply && (
                    <ReplyInputField 
                    setShow={setShowReplyInput} 
                    setCommentsRepliesCount={setCommentsRepliesCount} 
                    setCommentsReplies={setCommentsReplies} movie={movie}
                    parentComment={id}
                    replyingTo={id}/>
                )}

                {showReplyInput && isReply && (
                    <ReplyInputField 
                    setShow={setShowReplyInput} 
                    setCommentsRepliesCount={setCommentsRepliesCount} 
                    setCommentsReplies={setCommentsReplies}
                    movie={movie} replyingTo={id} 
                    parentComment={parentComment}/>
                )}

            </Content>
        </Container>
    )
}