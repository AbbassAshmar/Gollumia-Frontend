import { useGoogleLogin } from '@react-oauth/google';
import styled from 'styled-components';
import { useCookies } from "react-cookie";
import {useNavigate } from "react-router-dom"
import { setCookies } from '../../pages/LoginPage/login-page';



const Button =styled.button`
background-color:#dd4b39;
height:40px;  
min-height:40px;
border-radius: 4px;
color:white;
border:0px transparent;  
text-align: center;
width: 150px;
min-width:82px;
&:hover{
    opacity:0.6;
}
`

export default function Google(){
    const [cookies, setCookie] = useCookies(["token"])
    let navigate = useNavigate()

    
    async function send_token(access_token){
        const URL = `${process.env.REACT_APP_API_URL}/api/auth/google/register`;
        const INIT = {
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({"access_token" : access_token})
        }

        const request = await fetch(URL,INIT);

        if (request.status == 200){
            const response = await request.json();
            
            const data = response.data;
            const cookiesToSet = {
                token: data.token,
                email: data.user.email,
                username: data.user.username,
                id: data.user.id,
                pfp: data.user.pfp
            };

            setCookies(cookiesToSet, setCookie);
            navigate("/home", { replace: true });
        }else{
            alert("Error try again later")
        }
    }

    const Success = (response)=>{
        send_token(response.access_token)
    }

    const Error = ()=>{
        alert("Error try again later")
    }
    
    const login = useGoogleLogin({
        onSuccess: Success,
        onError: Error,
    });

    return(
        <Button type='Button' onClick={() => login()}>
            <i style={{margin:"0 1px 0 2px"}} className="fa-brands fa-google"></i> Google
        </Button>
    )
}


