import styled from "styled-components";
import ProfilePicture from "../ProfilePicture/profile-picture";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import ReplyInputField from "./reply-input-field";

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
background-color: orange;
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
const NameDataContainer= styled.div`
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
left:0;
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
padding: .5rem 1.25rem;
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
const TextContainer = styled.div`
gap:.5rem;
color:white;
display: flex;
flex-direction: column;
align-items: flex-start;
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

const actionsList = [{name : <span>Edit</span>, icon : <i className="fa-solid fa-pen-to-square"/>}, {name: <span>Delete</span>, icon : <i className="fa-solid fa-trash"/>}];

export default function CommentBox({text, user, createdAt,  likes, dislikes, id, movie, isReply, replyingTo, parentComment,setCommentsReplies, setCommentsRepliesCount}){
    const [showActionsList, setShowActionsList] = useState(true);
    const [showReplyInput, setShowReplyInput] = useState(false);

    const [cookies] = useCookies()

    function handleEllipsisClick (){
        setShowActionsList(!showActionsList);
    }

    function deleteComment(){

    }

    function editComment(){

    }

    function likeComment(){

    }

    function dislikeComment(){

    }

    function handleReplyButtonClick(){
        setShowReplyInput(true);
    }
    
    return(
        <Container>
            <UserProfilePicture>
                {user.pfp ? 
                <Picture src={user.pfp} alt={`${user.id}-profile`}/>:
                user.username[0].toUpperCase()} 
            </UserProfilePicture>
            <Content>
                <DetailsContainer>
                    <NameDataContainer>
                        <Names>
                            <Username>{user.username}</Username>
                            {isReply && replyingTo && (
                                <div style={{display:"flex",gap:'.5rem',alignItems:"center",color:"#A8AAAE"}}>
                                    <i style={{rotate:"y 180deg"}} className="fa-solid fa-reply" />
                                    <UserNameReplyingTo>{replyingTo.user.username}</UserNameReplyingTo>
                                </div>
                            )}
                        </Names>
                        <CreatedAt>{createdAt}</CreatedAt>
                    </NameDataContainer>
                    {cookies?.id && cookies.id === user.id && (
                        <ActionsContainer>
                            <i onClick={handleEllipsisClick} className="fa-solid fa-ellipsis-vertical"/>
                            <ActionsList show={showActionsList}>
                                {actionsList.map(option=>(
                                    <ActionsOption>
                                        {option.icon}
                                        {option.name}
                                    </ActionsOption>
                                ))}
                            </ActionsList>
                        </ActionsContainer>
                    )}
                </DetailsContainer>
                <TextContainer>
                    {text}
                </TextContainer>
                <InteractionsContainer>
                    <LikeDislikeButton>
                        <i className="fa-regular fa-thumbs-up"/>
                        <span>{dislikes}</span>
                    </LikeDislikeButton>
                    <LikeDislikeButton>
                        <i className="fa-regular fa-thumbs-down"/>
                        <span>{likes}</span>
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
                    movie={movie} replyingTo={replyingTo.id} 
                    parentComment={parentComment}/>
                )}
            </Content>
        </Container>
    )
}