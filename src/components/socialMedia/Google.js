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
&:disabled{
    background-color: grey;
}
`

export default function Google({isLoading=false, setIsLoading, setPopUpMessage}){
    const [cookies, setCookie] = useCookies(["token"])
    let navigate = useNavigate()
    
    async function requestLogin(access_token){
        const URL = `${process.env.REACT_APP_API_URL}/api/auth/google/register`;
        const INIT = {
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({"access_token" : access_token})
        }

        try {
            const request = await fetch(URL,INIT);
            const response = await request.json();

            if (request.status == 200){
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
                alert()
                setPopUpMessage({show:true, message:"Try again later", status:"error"});
            }
        }catch(error){
            setPopUpMessage({show:true, message:"Service Unavailable", status:"error"});
        }

        setIsLoading(false);
    }

    const Success = (response)=>{
        requestLogin(response.access_token)
    }

    const Error = ()=>{
        setPopUpMessage({show:true, message:"Try again later", status:"error"});
        setIsLoading(false);
    }
    
    const login = useGoogleLogin({
        onSuccess: Success,
        onError: Error,
    });

    function handleClick(e){
        e.preventDefault();
        setIsLoading(true);
        login()
    }

    return(
        <Button type={"button"} disabled={isLoading} onClick={handleClick}>
            <i style={{margin:"0 1px 0 2px"}} className="fa-brands fa-google"></i> Google
        </Button>
    )
}


