import React, { useEffect } from "react";
import TwitterLogin from 'react-twitter-auth/lib/react-twitter-auth-component.js';
import  {MDBIcon} from 'mdb-react-ui-kit';

function Twitter(){
    const onFailed  =()=>{
        console.log("Failed")
    }
    const onSuccess  =()=>{
        console.log("Success")
    }
    const customHeader = {
        backgroundColor:"black",
    }
    const twitter ={
        backgroundColor:"blue",
        borderRadius:"4px",
        height:"38px",
        color:"white",
        border:"0px transparent",
        textAlign:"center",
        width:"130px",
    }
    const handleMouseOver =(e)=>{
         e.target.style.opacity = '0.6';
    }
    
    return(
        <TwitterLogin
            type="button"
            loginUrl="http://localhost:4000/api/v1/auth/twitter"
            onFailure={onFailed}
            onSuccess={onSuccess}
            requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"
            showIcon={true}
            customHeaders={customHeader}
            style={twitter}
            className="twitterLoginBtn"
            onMouseOver={handleMouseOver}
        >
                <MDBIcon fab icon="twitter" style={{marginRight:"7px"}}/>
                Twitter
        </TwitterLogin>
    )
}

export default Twitter;