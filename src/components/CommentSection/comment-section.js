import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import InputField from "./components/input-field";
import ProfilePicture from "../ProfilePicture/profile-picture";
import { useCookies } from "react-cookie";
import {Link, useParams} from "react-router-dom";
import CommentRepliesBox from "./components/comment-replies-box";
import useWindowDimensions from "../../hooks/use-window-dimensions";
import LoadingCircle from "../LoadingCircle/loading-circle";
import Recommendations from "./components/recommendations";

const Container = styled.div`
width: 100%;
display: flex;
gap:2rem;
align-items: flex-start;
`
const CommentsInputContainer = styled.div`
flex:3.5;
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
const CommentsRepliesContainer = styled.div`
color:white;
gap:1.5rem;
display: flex;
flex-direction: column;
`

const sortList = [{name : <span>Newest</span>, icon : <i className="fa-solid fa-clock"/>}, {name: <span>Hot</span>, icon : <i className="fa-solid fa-fire"/>}];
export default function CommentSection(){
    const { id } = useParams()    
    const [cookies,setCookies] = useCookies()

    const [commentsReplies, setCommentsReplies] = useState([]);
    const [commentsRepliesCount,setCommentsRepliesCount] = useState(0);

    const [isLoadingCommentsReplies, setIsLoadingCommentsReplies] = useState(false);

    const [showSortList, setShowSortList] = useState(false);

    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const CAN_FETCH_MORE = currentPage < totalPages;

    const [scrollPosition, setScrollPosition] = useState(0);

    const commentsRepliesContainerRef = useRef()
    const {height:windowHeight, width:windowWidth} = useWindowDimensions();

    const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(()=>{
        if (isLoadingCommentsReplies)
        fetchCommentsAndReplies(id,currentPage)
    },[isLoadingCommentsReplies])

    useEffect(()=>{
        setIsLoadingCommentsReplies(true);
    },[currentPage])
 
    useEffect(()=>{
        const bottomOfContainerOffset = commentsRepliesContainerRef.current.getBoundingClientRect().bottom - windowHeight
        if (bottomOfContainerOffset <= 100 && !isLoadingCommentsReplies){
            if (CAN_FETCH_MORE)
            setCurrentPage((prev) => prev + 1)
        }
    },[scrollPosition])

    async function fetchCommentsAndReplies (id,page){
        const URL = `${process.env.REACT_APP_API_URL}/api/movies/${id}/comments-and-replies/?page=${page}&limit=15`;
        const INIT = {headers : {'Authorization' : "Token " + cookies.token}}

        const request = await fetch(URL, INIT);
        const response = await request.json();

        if (request.status == 200){
            setCommentsReplies((prev) => [...prev,...response.data.comments_replies]);
            setCommentsRepliesCount(response.metadata.total_count)
            setTotalPages(response.metadata.pages_count)
        }

        setIsLoadingCommentsReplies(false);
    }

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
            <CommentsInputContainer>
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
                        <InputField setCommentsRepliesCount={setCommentsRepliesCount} setCommentsReplies={setCommentsReplies}/>
                    </InputContainer>
                </Header>
                <CommentsRepliesContainer ref={commentsRepliesContainerRef}>
                    {commentsReplies.length > 0 ? commentsReplies.map((comment)=>(
                        <CommentRepliesBox
                        setCommentsRepliesCount={setCommentsRepliesCount}
                        setCommentsReplies={setCommentsReplies}
                        key={comment.id} 
                        comment={{...comment}} 
                        repliesList={comment.replies}/>
                    )) : "No comments Yet !"}
                </CommentsRepliesContainer>
                {isLoadingCommentsReplies &&(
                    <div style={{width:'100%', display:'flex', justifyContent:"center"}}>
                        <LoadingCircle />
                    </div>
                )}
            </CommentsInputContainer>
            {windowWidth >= 1024 &&(
                <Recommendations commentsRepliesContainerRef={commentsRepliesContainerRef} scrollPosition={scrollPosition}/>
            )}
        </Container>
    )
}
