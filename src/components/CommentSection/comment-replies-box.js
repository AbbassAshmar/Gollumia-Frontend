import styled from "styled-components"; 
import CommentBox from "./comment-box";
import ReplyBox from "./reply-box";



const Container = styled.div`
display: flex;
flex-direction: column;
gap:1.5rem;
`

const RepliesContainer = styled.div`
margin-left:calc(57px + 1rem);
display: flex;
flex-direction: column;
gap:1.5rem;
`

export default function CommentRepliesBox({comment, repliesList}){
    return(
        <Container>
            <CommentBox 
            id={comment.id}
            text={comment.text} 
            user={comment.user} 
            likes={comment.likes} 
            dislikes={comment.dislikes}
            createdAt={comment.created_at}/>
            
            {(repliesList && repliesList.length>0) && (
                <RepliesContainer>
                    { repliesList.map(reply => (
                        <CommentBox
                        isReply={true}
                        key={reply.id}
                        id={reply.id}
                        text={reply.text} 
                        user={reply.user} 
                        likes={reply.likes} 
                        dislikes={reply.dislikes}
                        createdAt={reply.created_at}
                        replyingTo={reply.replying_to}/>
                    ))}
                </RepliesContainer>
            )}
        </Container>
    )
}