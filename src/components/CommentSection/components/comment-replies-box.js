import styled from "styled-components"; 
import CommentBox from "./comment-box";

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

export default function CommentRepliesBox({comment, repliesList, setCommentsReplies, setCommentsRepliesCount}){
    return(
        <Container>
            <CommentBox 
            setCommentsRepliesCount={setCommentsRepliesCount}
            setCommentsReplies={setCommentsReplies}
            id={comment.id}
            text={comment.text} 
            interaction={comment.interaction}
            movie={comment.movie}
            user={comment.user} 
            likes={comment.likes} 
            dislikes={comment.dislikes}
            createdAt={comment.created_at}/>
            
            {(repliesList && repliesList.length>0) && (
                <RepliesContainer>
                    {repliesList.map(reply => (
                        <CommentBox
                        setCommentsRepliesCount={setCommentsRepliesCount}
                        setCommentsReplies={setCommentsReplies}
                        isReply={true}
                        key={reply.id}
                        id={reply.id}
                        text={reply.text} 
                        movie={reply.movie}
                        user={reply.user} 
                        likes={reply.likes} 
                        dislikes={reply.dislikes}
                        createdAt={reply.created_at}
                        interaction={reply.interaction}
                        parentComment = {reply.parent_comment}
                        replyingTo={reply.replying_to}/>
                    ))}
                </RepliesContainer>
            )}
        </Container>
    )
}