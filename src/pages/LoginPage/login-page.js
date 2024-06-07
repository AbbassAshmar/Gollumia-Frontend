import React, { useEffect } from "react";
import { useState } from "react";
import "./login.css"
import styled from 'styled-components'
import { Link, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Facebook from "../../components/socialMedia/facebook";
import Twitter from "../../components/socialMedia/twitter";
import Google from "../../components/socialMedia/google";
import MoviesBackground from "../../photos/wallpaperflare.com_wallpaper.jpg";
import SimplifiedNavbar from "../../components/SimplifiedNavbar/simplified-navbar";

const Container =styled.div`
color:white;
width: 100%;
background-image: url(${MoviesBackground});
background-position: center;
background-size: cover;
background-repeat: no-repeat;
position: relative;
&::before{
    content:"";
    position:absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5));
}
`
const ContentContainer = styled.div`
position: relative;
z-index: 10000;
width:100%;
height: 100%;
`
const Main = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
padding:2rem;
`
const Logo = styled.h1`
font-family: 'Kanit', sans-serif;
font-family: 'Open Sans', sans-serif;
color:orange;
font-weight:700;
margin-left:2rem;
margin-top :7px;
`
const FormContainer = styled.div`
border-radius: 8px;
padding:2rem;
gap:2rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: rgba(41, 39, 39, 0.5);   
box-shadow: 0 5px 30px black,0 5px 30px black;
`
const TextContainer = styled.div`
gap: .5rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const Form = styled.form`
gap:2rem;
width: 100%;
display: flex;
flex-direction:column;
align-items: center;
justify-content: center;
`
const Inputs = styled.div`
width: 100%;
gap:1rem;
display: flex;
flex-direction:column;
align-items: center;
justify-content: center;
`

const SubmitButtonContainer = styled.div`
width: 100%;
gap:.5rem;
display: flex;
flex-direction:column;
align-items: center;
justify-content: center;
`

const InputContainer = styled.div`
width:100%;
display: flex;
flex-direction: column;
gap: 0.5rem;
`
const Input = styled.input`
width:100%;
border-radius:5px;
height:45px;
border :none;
outline:none;
color:black;
padding-left:.5rem;
`
const Message = styled.p`
font-size:14px;
color:red;
`
const SignInButton =styled.button`
border:none;
background:orange;
width:fit-content;
padding: 0.5rem 1rem;
border-radius: 6px;
`
const SocialMediaContainer = styled.div`
width: 100%;
gap: 0.5rem;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
const SocialMediaButtons = styled.div`
display: flex;
gap:1rem;
`
const SignUpInstead = styled.div`

`
function LoginPage(){
    let navigate = useNavigate();
    const {state}= useLocation();

    const [email, setEmail] = useState("")
    const [password, setPass] = useState("")

    const [cookies,setCookies,removeCookie] = useCookies(["token"])
    const [errors, setErrors] = useState({error_fields:[], messages:{}});

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
      
    useEffect(()=>{
        if(cookies.token) 
        navigate('/home',{replace:true})
    },[])

    useEffect(()=>{
        if(state !=null)
        setEmail(state.email);
    })

    async function requestLogin(user){
        const url = `${process.env.REACT_APP_API_URL}/login/`;
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
        <Container>
            <ContentContainer>
                <Main>
                    <FormContainer>
                        <TextContainer>
                            <h2>Sign In</h2>
                            <p style={{margin:'0',maxWidth:'270px',textAlign:"center"}}>Enter Your details to sign in to your account and join us</p>
                        </TextContainer>
                        <Form onSubmit={handleSubmit}>
                            <Inputs>
                                <InputContainer>
                                    <Input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Email"/>
                                    {errors.messages['email'] && <Message>{errors.messages['email']}</Message>}
                                </InputContainer>
                                <InputContainer>        
                                    <Input value={password} onChange={(e)=>{setPass(e.target.value)}} type="password" placeholder="Password"/>
                                    {errors.messages['password'] && <Message>{errors.messages['password']}</Message>}
                                </InputContainer>
                            </Inputs>
                            <SubmitButtonContainer>
                                <Link id="login-forgot-password" to="#">Forgot password ?</Link>
                                <SignInButton style={{width:"80%", backgroundColor:"orange", border:"none"}}>Sign in</SignInButton>
                            </SubmitButtonContainer>
                            <SocialMediaContainer>
                                <p style={{margin:'0'}}>Or login with</p>
                                <SocialMediaButtons>
                                    <Twitter />
                                    <Facebook />
                                    <Google />
                                </SocialMediaButtons>
                            </SocialMediaContainer>
                            <SignUpInstead>
                                <p style={{marginRight:'5px',display:"inline"}}>Don't have an account?</p>
                                <Link to="/register">Sign up !</Link>
                            </SignUpInstead>
                        </Form>
                    </FormContainer>
                </Main>
            </ContentContainer>
        </Container>
    )

}

export default LoginPage;