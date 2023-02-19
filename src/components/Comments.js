import React, { useState } from "react";
import { cookies, useCookies } from "react-cookie";
import styles from "./Comments.module.css"
import CmntInput from "./CommentSectionComponents/CommentInput"
import Pfp from "./pfp";
import { Link } from "react-router-dom";
import CmntDiv from "./CommentSectionComponents/CmntDiv";
import { useEffect } from "react";
import CmntPfp from "./CommentSectionComponents/cmntPfp";
function Comment(props){
    const [cookies,setCookies] = useCookies(["token"])
    const [cmnts, setCmnts] = useState([])
    const [count , setCount] = useState(0)

    const getNewInteractions=(interactions)=>{ // receive the new values of likes and dislikes from LikeDislikeBtns by CmntDiv
            cmnts.map( // update likes and dislikes of the cmnt or reply that the user interacted with in the cmnts state array
                (cmnt)=>{
                    if (cmnt.id == interactions.cmntId){
                        if (!interactions.is_reply){
                            cmnt.likes = interactions.likes
                            cmnt.dislikes = interactions.dislikes
                        }else{
                            cmnt.replies.map(
                                (reply)=>{
                                    if (reply.id==interactions.replyId){
                                        console.log('here')
                                        reply.likes = interactions.likes
                                        reply.dislikes = interactions.dislikes
                                    }
                                }
                            )
                        }
                        setCmnts([...cmnts])  // rerender the cmnts array with the new updated values of likes and dislikes
                        // after rerendering , the new values of likes and dislikes are passed to the LikeDislikeBtns again via props
                        // the initial value of the likes/dislikes state in LikeDislikeBtns is the values passed by props 
                        
                    }
                }
            )
    }

    const replydata = (repdata)=>{
        let desiredCmnt =''
        for (let i=0;i<cmnts.length; i++){
            if (cmnts[i].id ==repdata.parent_comment) {
            desiredCmnt = cmnts[i].id
        }}
        cmnts.map((cmnt)=>{ // to add a reply to the rendered list of cmnts, look for comment the this reply belong to, and then add the reply to the list
            if(cmnt.id == desiredCmnt){
                repdata.profile=cookies.token[4]
                repdata.likes = 0
                repdata.dislikes = 0
                cmnt.replies.push(repdata)
                setCmnts(cmnts=>{return[...cmnts]})
                setCount(repdata.comments_count) // a new reply is added so update the count 
            }
        })
    }
    const resp = (res)=>{
        setCmnts((cmnts)=>{return [{profile:cookies.token[4],id:res.id,likes:0,dislikes:0,text:res.text,user:cookies.token[2],date:res.dateAdded,replies:[]},...cmnts]});
        setCount(res.comments_count) // a new cmnt is added so update the count 
    }
    useEffect(()=>{
        let page_id ={page_id : props.page_id}
        const getComments = async function(){
            const comntReq = await fetch("http://127.0.0.1:8000/allcomments/",{
                method:"post",
                headers:{
                    "Content-type":"application/json",
                    "Authorization":"Token "+ cookies.token[0],
                },
                body:  JSON.stringify(page_id)

            })
            const comntRes = await comntReq.json()
            if (comntReq.status==204){
                setCmnts([])
            }else{
                setCmnts(comntRes["comments"])
                setCount(comntRes["comments_count"])
            }
        }
        getComments()
    },[props])
    useEffect(()=>{
        console.log("updated")
    })
    useEffect(()=>{console.log(cmnts)},[cmnts])
    
    return(
        <div className={styles.Container}>
            <div className={styles.CmntBox}>
                <div className={styles.cmntCountUsername}>
                    <div>
                        <h3>{count} Comments</h3> {/*comments and replies total count, updated whenever a new reply or cmnt is added + when the page refreshes*/}
                    </div>
                    <div>
                        <h3 style={{fontSize:"1.3rem"}}> { cookies.token[2] }</h3>
                    </div>
                </div>
                <div className={styles.cmntPfpInput}>
                    <Link to="#"><CmntPfp letter={cookies.token[4]?cookies.token[4]:cookies.token[2][0]}/></Link>
                    <CmntInput setData={resp} page_id={props.page_id} reply={false}/>
                </div>
            </div>
            <div className={styles.CmntsArea}>
                {cmnts.length >0 ?cmnts.map((comment)=>{
                    return (
                    <React.Fragment>
                        <CmntDiv getNewInteractions={getNewInteractions} date={comment.date} page_id={props.page_id} getData={replydata} likes={comment.likes} dislikes={comment.dislikes}  letter={comment.profile?comment.profile:comment.user[0].toUpperCase()} key={comment.id} cmntId={comment.id} Isreply={false} username={comment.user} text={comment.text}/>
                        {   
                            comment.replies && comment.replies.length>0?
                            comment.replies.map((Reply)=>{
                                console.log(Reply)
                                return <CmntDiv getNewInteractions={getNewInteractions} date={Reply.date} page_id={props.page_id} likes={Reply.likes} dislikes={Reply.dislikes} letter={Reply.profile?Reply.profile:Reply.user[0].toUpperCase()} getData={replydata} key={Reply.id} reply_id={Reply.id}  cmntId={comment.id}  Isreply={true} username_replying_to={Reply.user_replying_to} username={Reply.user} text={Reply.text}/>
                                
                            }
                            ):null
                        }
                    </React.Fragment>
                    )
                }):<h3>No comments yet !</h3>}
    
            </div>
        </div>
    )
}

export default Comment;