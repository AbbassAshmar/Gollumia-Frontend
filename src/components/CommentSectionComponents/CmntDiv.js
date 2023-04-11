import styled from "styled-components";
import styles from "./Comments.module.css"
import { useEffect, useState } from "react";
import CommentInput from './CommentInput';
import CmntPfp from "./cmntPfp";
import LikeDislikeBtns from "./LikeDislikeBtns"
const Div = styled.div`
    width: 100%;
    display:flex;
    gap:.9rem;
    margin-top:1rem;
`
const ReplyDiv = styled.div`
    width: 93.8%;
    display:flex;
    gap:.9rem;
    margin-top:1rem;
    margin-left:4rem;
`
const P =styled.p`
width:80%;
margin-bottom:.2em;
`

function CmntDiv(props){
    const [rep, setRep] = useState(<CommentInput style={{display:"None"}} />);
    const [info, setInfo] = useState({username:" ",key:0,replyId:0,isReply:false,date:"some seconds ago"})
    
    useEffect(()=>{
        setInfo({key:props.cmntId,username:props.username,replyId:props.reply_id,isReply:props.Isreply,date:props.date})
        const now = new Date();
        const CmntDate = new Date(Date.parse(props.date))
        let timePassed = Math.floor((now-CmntDate)/1000/60)
        if (timePassed == 0){
            setInfo({...info, date:"some seconds ago"})
        }else if (timePassed <60){
            setInfo({...info, date:`${timePassed} minutes ago`})
        }else if(timePassed < 1440){
            setInfo({...info, date:`${Math.floor(timePassed/60)} hours ago`})
        }else{
            setInfo({...info, date:`${Math.floor(timePassed/60/24)} days ago`})
        }
    },[props])
    function handleReply(e){
        // getRes transfers data from Comment Input component to Comments component, Comments Compnent is the container of comments where comments and replies are rendered,
        // CmntDiv component is the comment or the reply ,(the comment box that is going to be rendered in the Comments Component)
        // Comment Input is the Textarea (the form) where you type the comment , when you type and press submit (comment btn) a request is sent to the server to save the comment
        
        const getRes = (result)=>{ // pass info from comment input to CmntDiv, then to Comments.js
            props.getData(result)
            setRep(<CommentInput style={{display:"None"}} />);
            e.target.style.color = "white"
        } 
        setRep(<CommentInput page_id={props.page_id}  username_replying_to={props.username} id={props.cmntId} new_reply_data={getRes} reply={true} style={{marginLeft:"4rem"}} />);
        e.target.style.color = "#Cb7900"
    }
  
    const InlineStyles = {
        reply :{
            display:"flex",
            alignItems:"center",
            height:"30px",
            gap:"6px",
            paddingLeft:"5%",
        },
        replyIcon:{
            transform:"rotateY(180deg)",
            fontSize:".8rem",
            alignSelf:'center',
            position:"relative",
            top:"-3px",
            marginRight:"2px",
        },
        replyingTo:{
            disply:"inline-block",
            fontSize:".8rem",
            margin:"0",
            position:"relative",
            bottom:"20%"
        },
        usernameCont:{
            display:"flex",
            justifyContent:"space-between",
            width:"100%",
        },
        username:{
            fontSize:"1.1rem",
            minWidth:"fit-content",
            margin:'0 .3rem 0 0',
            color:"#Cb7900",

        }
    }
    const getNewInteractions = (interactions)=>{ //get the new values of likes and dislikes from LikeDislikeBtns component
        interactions.cmntId = props.cmntId
        interactions.replyId =props.reply_id
        interactions.is_reply = props.Isreply
        props.getNewInteractions(interactions)
    }
    return(
        <>
        { props.Isreply == true?
        <ReplyDiv>
            <CmntPfp letter={props.letter}/>
            <div style={{width:"100%"}}>
                <div className={styles.titlesContainer}>
                    <h3 style={InlineStyles.username}>{props.username}</h3>
                    <i style={InlineStyles.replyIcon} className="fa-solid fa-reply"></i>
                    <div style={InlineStyles.usernameCont}>
                        <p style={InlineStyles.replyingTo}>{props.username_replying_to}</p>
                        <i style={{padding:".3% 2% 0 0",cursor:"pointer"}} className="fa-solid fa-ellipsis"></i>
                    </div> 
                </div>
                <div style={{display:"flex",alignItems:"center",gap:"5px",fontSize:"0.8em"}}>
                    <i className="fa-regular fa-clock"></i>
                    <p className={styles.CmntDatePassed}>{info.date}</p>
                </div>
                <P>{props.text}</P>
                <div className={styles.CmntDivBtnsCont}>
                    <LikeDislikeBtns getNewInteractions={getNewInteractions} cmntId={props.cmntId} Isreply={props.Isreply} reply_id={props.reply_id} likes={props.likes} dislikes={props.dislikes} rep={rep}/>
                    <button id="replyBtn" onClick={handleReply} style={InlineStyles.reply} className={styles.CmntDivBtns}><i style={{fontSize:"0.4rem",transform:"translateY(-30%)"}} className="fa-solid fa-circle"></i><p style={{margin:"0",fontSize:".8rem"}}>Reply</p></button>
                </div>
            </div>
        </ReplyDiv>
        :
        <Div>
            <CmntPfp letter={props.letter}/>
            <div style={{width:'100%'}}>
                <div style={InlineStyles.usernameCont}>
                    <h3 style={InlineStyles.username}>{props.username}</h3>
                    <i style={{padding:".3% 2% 0 0",cursor:"pointer"}} className="fa-solid fa-ellipsis"></i>
                </div> 
                <div style={{display:"flex",alignItems:"center",gap:"5px",fontSize:"0.8em"}}>
                    <i className="fa-regular fa-clock"></i>
                    <p className={styles.CmntDatePassed}>{info.date}</p>
                </div>
                <P>{props.text}</P>
                <div className={styles.CmntDivBtnsCont}>
                    <LikeDislikeBtns getNewInteractions={getNewInteractions} cmntId={props.cmntId} Isreply={props.Isreply} reply_id={props.reply_id} likes={props.likes} dislikes={props.dislikes} rep={rep}/>
                    <button id="replyBtn" onClick={handleReply} style={InlineStyles.reply} className={styles.CmntDivBtns}><i style={{fontSize:"0.4rem",transform:"translateY(-30%)"}} className="fa-solid fa-circle"></i><p style={{margin:"0",fontSize:".8rem"}}>Reply</p></button>
                </div>
            </div>
        </Div>        
        }
        {rep} {/*when rendered, the position of cmnts and replies in the ui changes thus rerendering them all removing their states*/}
        </>
    )
}

export default CmntDiv;



// the user adds a reply 
// reply is send to the database by a request
// if the request is true , the info of the reply are set in a state and the state is passed to the parent comoponent
// from commentInput comment that sent the request
// the reply is add to a state too using his info , the state should be a list containing the reps of a comment 
// this list is rendered using map()