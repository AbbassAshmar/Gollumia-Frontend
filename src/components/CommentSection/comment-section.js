import { useState, useEffect } from "react";
import styled from "styled-components";
import InputField from "./input-field";
import ProfilePicture from "../ProfilePicture/profile-picture";
import { useCookies } from "react-cookie";
import {Link} from "react-router-dom";
import CommentRepliesBox from "./comment-replies-box";

const Container = styled.div`
gap:2rem;
width:100%;
display:flex;
flex-direction: column;
`
const Header = styled.div`
gap:2rem;
display: flex;
flex-direction: column;
`
const DetailsCountContainer = styled.div`
width:100%;
display:flex;
justify-content: space-between;
`
const CountSortContainer = styled.div`
display:flex;
justify-content: flex-start;
gap:2rem;
`
const CommentsCount = styled.div`
color:white;
font-size:1rem;
`
const SortContainer = styled.div`
position: relative;
`
const SortButton = styled.button`
color:white;
&:hover{
    color:grey;
}
`
const SortList = styled.div`
left:0;
top: 115%;
z-index: 3;
overflow: hidden;
width: fit-content;
position: absolute;
transition: max-height .3s;
max-height: ${({show})=> show ? "20vh" : "0"};
`
const SortOption = styled.div`
gap:.5rem;
color:white;
display: flex;
font-size:14px;
cursor: pointer;
align-items: center;
padding: .75rem 1.5rem;
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
const LoginLink = styled(Link)`
color:orange;
text-decoration: none;
`
const InputContainer= styled.div`
width:100%;
display: flex;
gap:1rem;
`

const LogInAvatar = styled.div`
width:57px;
height:57px;
display:flex;
border-radius:17px;
background-color:orange;
justify-content:center;
align-items:center;
cursor:pointer;
`
const UserLockedIcon = styled.i`
font-size: 1.5rem;
`
const Content = styled.div`

`
const CommentsRepliesContainer = styled.div`
gap:1rem;
display: flex;
flex-direction: column;
`

const sortList = [{name : <span>Newest</span>, icon : <i className="fa-solid fa-clock"/>}, {name: <span>Hot</span>, icon : <i className="fa-solid fa-fire"/>}];
export default function CommentSection({movie_id}){
    const [cookies,setCookies] = useCookies()
    const [commentsReplies, setCommentsReplies] = useState(RESPONSE.data.comments_replies);
    const [commentsRepliesCount,setCommentsRepliesCount] = useState(RESPONSE.metadata.comments_replies_count);

    const [showSortList, setShowSortList] = useState(false);

   
    async function fetchCommentsAndReplies (id){
        const request = await fetch(`${process.env.REACT_APP_API_URL}/api/movies/${id}/comments-and-replies/`);
        const movie_data = await request.json();

        if (request.status == 200){
            setCommentsReplies(movie_data.data.comments_replies);
        }
    }

    useEffect(()=>{
        fetchCommentsAndReplies(movie_id)
    },[])

    function handleSortButtonClick(e){
        setShowSortList(!showSortList);
    }

    const renderAvatar = () => {
        if (cookies?.token) {
          return (
                <div style={{width:'57px', height:'57px'}}>
                    <ProfilePicture style={{borderRadius:"17px"}}/>
                </div>
            );
        }
        return (
            <LogInAvatar>
                <UserLockedIcon className="fa-solid fa-user-lock" />
            </LogInAvatar>
        );
    };

    return(
        <Container>
            <Header>
                <DetailsCountContainer>
                    <CountSortContainer>
                        <CommentsCount>
                            <i style={{marginRight:"8px"}} className="fa-solid fa-message"/>
                            Comments ({commentsRepliesCount})
                        </CommentsCount>
                        <SortContainer>
                            <SortButton onClick={handleSortButtonClick}>
                                <i style={{marginRight:"8px"}} className="fa-solid fa-filter"/>
                                Sort
                            </SortButton>
                            <SortList show={showSortList}>
                                {sortList.map(option => (
                                    <SortOption>
                                        {option.icon}                                      
                                        {option.name}
                                    </SortOption>
                                ))}
                            </SortList>
                        </SortContainer>
                    </CountSortContainer>
                    {!cookies.token && <LoginLink to={"/login"}>
                        Join us <i className="fa-solid fa-arrow-right"/>
                    </LoginLink>}
                </DetailsCountContainer>
                <InputContainer>
                    {renderAvatar()}
                    <InputField />
                </InputContainer>
            </Header>
            <Content>
                <CommentsRepliesContainer>
                    {commentsReplies.map((comment)=>(
                        <CommentRepliesBox
                        key={comment.id} 
                        comment={{...comment}} 
                        repliesList={comment.replies}/>
                    ))}
                </CommentsRepliesContainer>
            </Content>
        </Container>
    )
}


const RESPONSE = {
    status: "success",
    error: null,
    data: {
        comments_replies: [
            {
                id: 3,
                likes: 0,
                dislikes: 0,
                text: "comment3",
                created_at: "2024-05-21T06:27:19Z",
                user: {
                    id: 1,
                    email: "a@gmail.com",
                    username: "a",
                    password: "pbkdf2_sha256$600000$TSHVnSL1qRYAagl9mdwJEf$NWZNP5fzhhZSIgBQcSalwuLOjkSThN5vkM0cgKquKg4=",
                    pfp: 'https://i.etsystatic.com/22514180/c/1176/935/165/30/il/052f5c/2324271985/il_340x270.2324271985_t8ib.jpg'
                },
                movie: 7,
                likes_dislikes: [],
                replies: []
            },
            {
                id: 1,
                likes: 0,
                dislikes: 0,
                text: "comment1",
                created_at: "2024-05-21T06:26:54Z",
                user: {
                    id: 1,
                    email: "a@gmail.com",
                    username: "a",
                    password: "pbkdf2_sha256$600000$TSHVnSL1qRYAagl9mdwJEf$NWZNP5fzhhZSIgBQcSalwuLOjkSThN5vkM0cgKquKg4=",
                    pfp: 'https://i.etsystatic.com/22514180/c/1176/935/165/30/il/052f5c/2324271985/il_340x270.2324271985_t8ib.jpg'
                },
                movie: 7,
                likes_dislikes: [],
                replies: [
                    {
                        id: 1,
                        likes: 0,
                        dislikes: 0,
                        text: "reply_comment_1",
                        created_at: "2024-05-21T06:38:32Z",
                        user: {
                            id: 1,
                            email: "a@gmail.com",
                            username: "a",
                            password: "pbkdf2_sha256$600000$TSHVnSL1qRYAagl9mdwJEf$NWZNP5fzhhZSIgBQcSalwuLOjkSThN5vkM0cgKquKg4=",
                            pfp: 'https://i.etsystatic.com/22514180/c/1176/935/165/30/il/052f5c/2324271985/il_340x270.2324271985_t8ib.jpg'
                        },
                        movie: 7,
                        parent_comment: 1,
                        replying_to: null,
                        likes_dislikes: []
                    },
                    {
                        id: 2,
                        likes: 0,
                        dislikes: 0,
                        text: "reply_comment_1",
                        created_at: "2024-05-21T06:38:50Z",
                        user: {
                            id: 1,
                            email: "a@gmail.com",
                            username: "a",
                            password: "pbkdf2_sha256$600000$TSHVnSL1qRYAagl9mdwJEf$NWZNP5fzhhZSIgBQcSalwuLOjkSThN5vkM0cgKquKg4=",
                            pfp: 'https://i.etsystatic.com/22514180/c/1176/935/165/30/il/052f5c/2324271985/il_340x270.2324271985_t8ib.jpg'
                        },
                        movie: 7,
                        parent_comment: 1,
                        replying_to: null,
                        likes_dislikes: []
                    },
                    {
                        id: 3,
                        likes: 0,
                        dislikes: 0,
                        text: "reply_to_reply_1_of_comment_1",
                        created_at: "2024-05-21T06:52:20Z",
                        user: {
                            id: 1,
                            email: "a@gmail.com",
                            username: "a",
                            password: "pbkdf2_sha256$600000$TSHVnSL1qRYAagl9mdwJEf$NWZNP5fzhhZSIgBQcSalwuLOjkSThN5vkM0cgKquKg4=",
                            pfp: 'https://i.etsystatic.com/22514180/c/1176/935/165/30/il/052f5c/2324271985/il_340x270.2324271985_t8ib.jpg'
                        },
                        movie: 7,
                        parent_comment: 1,
                        replying_to: {
                            text: "reply_comment_1",
                            movie: 7,
                            user: {
                                id: 1,
                                email: "a@gmail.com",
                                username: "a",
                                password: "pbkdf2_sha256$600000$TSHVnSL1qRYAagl9mdwJEf$NWZNP5fzhhZSIgBQcSalwuLOjkSThN5vkM0cgKquKg4=",
                                pfp: 'https://i.etsystatic.com/22514180/c/1176/935/165/30/il/052f5c/2324271985/il_340x270.2324271985_t8ib.jpg'
                            },
                            likes: 0,
                            dislikes: 0,
                            parent_comment: 1,
                            created_at: "2024-05-21T06:38:32Z"
                        },
                        likes_dislikes: []
                    }
                ]
            }
        ]
    },
    metadata: {
        comments_replies_count: 6
    }
}