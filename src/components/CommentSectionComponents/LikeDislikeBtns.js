import { useState,useEffect } from "react";
import {React} from "react";
import styles from "../Comments.module.css"
import { useCookies } from "react-cookie";
function LikeDislikeBtns(props){
    const [count,setCount] =useState({likeCount:0,dislikeCount:0})
    const [cookies,setCookies] =useCookies(["token"])
    useEffect(()=>{
        setCount({likeCount:props.likes,dislikeCount:props.dislikes})// initial value is props value, but the props value is alway being updated
        // the initial value will be up to date with what's saved in the db, thus even after rerendering the component,the numbers wont change 
    },[props])
   
    async function likeDislikeReq(rep,endpoint){
        let id = (rep?props.reply_id :props.cmntId)
        let data={
            reply:rep, id
        }
        const response = await fetch(`http://127.0.0.1:8000/${endpoint}/`,{
            method:"post",
            body: JSON.stringify(data),
            headers:{
                "Content-type":"application/json",
                "Authorization":"Token "+cookies.token[0]
            }
        })
        const jsonResponse = await response.json()
        setCount({likeCount:jsonResponse["likes"],dislikeCount:jsonResponse["dislikes"]})
        props.getNewInteractions(jsonResponse) // send the new values of likes and dislikes to the CmntDiv comp after the user likes or dislikes a reply or a cmnt
        return jsonResponse[endpoint]
    }
    function likeHandler(e){
        likeDislikeReq(props.Isreply,"like",)
    }
    function dislikeHandler(e){
       likeDislikeReq(props.Isreply,"dislike")
    }
    return(
        <>
            <button onClick={likeHandler} className={styles.CmntDivBtns}><i style={{marginRight:"4px"}} className="fa-solid fa-thumbs-up"></i>{count.likeCount}</button>
            <button onClick={dislikeHandler} className={styles.CmntDivBtns}><i style={{marginRight:"4px"}} className="fa-solid fa-thumbs-down"></i>{count.dislikeCount}</button>
        </>
    )
}

export default LikeDislikeBtns;