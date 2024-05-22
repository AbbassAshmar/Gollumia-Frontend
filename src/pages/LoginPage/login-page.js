import React, { useEffect } from "react";
import { useState } from "react";
import "./login.css"
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Facebook from "../../components/socialMedia/facebook";
import Twitter from "../../components/socialMedia/twitter";
import Google from "../../components/socialMedia/google";

const Logo = styled.h1`
font-family: 'Kanit', sans-serif;
font-family: 'Open Sans', sans-serif;
color:orange;
font-weight:700;
margin-left:2rem;
margin-top :7px;
`


const InputContainer = styled.div`
display: flex;
flex-direction: column;
gap: 0.5rem;
`
const Input = styled.input`
width:80%;
border-radius:5px;
margin:1rem 0;
height:45px;
border :none;
outline:none;
color:black;
`
const Message = styled.p`
font-size:14px;
color:red;
`

function LoginPage(){
    let navigate = useNavigate();
    
    const [email, setEmail] = useState("")
    const [password, setPass] = useState("")

    const [cookies,setCookies,removeCookie] = useCookies(["token"])
    const [errors, setErrors] = useState({error_fields:[], messages:{}});

    useEffect(()=>{
        if(cookies.token) 
        navigate('/home',{replace:true})
    },[])

    async function requestLogin(user){
        const url = `${process.env.REACT_APP_API_URL}login/`;
        const request = await fetch(url,{
            method:"POST",
            body:JSON.stringify(user),
            headers :{
                'Content-Type': 'application/json',
                'Authorization': ''
            },
        })

        const response = await request.json();
        return [request, response];
    }

    async function handleSubmit(e){
        e.preventDefault()
        const user = {email,password}
        const [request, response] = await requestLogin(user);

        if (request?.status == 200){
            const data = response.data
            const pfp = data.user.pfp && data.user.pfp != "null" ? 'http://127.0.0.1:8000' + data.user.pfp : null 

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate()+1);

            setCookies("token", data.token, {path :"/",expires:tomorrow})
            setCookies("email", data.user.email, {path :"/",expires:tomorrow})
            setCookies("username", data.user.username, {path :"/",expires:tomorrow})
            setCookies("id", data.user.id, {path :"/",expires:tomorrow})
            setCookies("pfp", pfp, {path :"/",expires:tomorrow})

            setErrors({error_fields:[], messages:{}});
            navigate('/movies')
        }

        //validation error
        if (request?.status == 400){
            setErrors({
                error_fields:response.metadata.error_fields,
                messages: response.error.details
            })
        }
    }
 
  
    return(
        <div className="login-page">
            <div className="login-page-container">
                <header>
                    <nav style={{height:"70px", display:"flex",alignItems:"center"}}>
                        <Logo>AFLIX</Logo>
                    </nav>
                </header>
                <main>
                    <div className="login-form-container">
                        <h2>Sign In</h2>
                        <form onSubmit={handleSubmit} className="login-form">

                            <InputContainer>
                                <Input onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Email"/>
                                {errors.messages['email'] && <Message>{errors.messages['email']}</Message>}
                            </InputContainer>
                            <InputContainer>        
                                <Input onChange={(e)=>{setPass(e.target.value)}} type="password" placeholder="Password"/>
                                {errors.messages['password'] && <Message>{errors.messages['password']}</Message>}
                            </InputContainer>

                            <div  id="login-forgot-password-div">
                                <Link id="login-forgot-password" to="#">Forgot password ?</Link>
                            </div>
                            <div className="sign-in-btn-div">
                                <Button style={{width:"80%", backgroundColor:"orange", border:"none"}}>Sign in</Button>
                            </div>
                            <p>Or login with</p>
                            <div className="social-media-logos">
                                <Twitter />
                                <Facebook />
                                <Google />
                            </div>
                            <div>
                                <p style={{marginRight:'5px'}}>Don't have an account?</p>
                                <Link to="/register">Sign up !</Link>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    )

}

export default LoginPage;