import React, { useEffect, useRef } from "react";
import { useState } from "react";
import styled from 'styled-components'
import { Link, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Google from "../../components/socialMedia/google";
import MoviesBackground from "../../photos/MoviesBackground.jpg";
import { motion, useScroll, useTransform } from "framer-motion";
import TextInput from "../../components/TextInput/text-input";

export const Container =styled.div`
color:white;
width: 100%;
padding:6rem 0 4rem 0;
position: relative;
&::before{
    content:"";
    top:0;
    left:0;
    width:100%;
    height:100%;
    position: absolute;
    background : rgba(0,0,0,0.6);
}
@media screen and (max-width:500px){
    padding:0;
}
`

export const BackgroundImageContainer = styled.div`
width:100%;
height:100%;
position: absolute;
top:0;
left:0;
z-index:-2;
background-color: transparent;
@media screen and (max-width:500px){
    display: none;
}
`
export const BackgroundImage = styled.img`
width:100%;
height:100%;
object-fit:cover;
`
export const ContentContainer = styled.div`
position: relative;
z-index: 10000;
width:100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
`

export const FormContainer = styled.div`
border-radius: 8px;
padding:4rem;
gap:2rem;
max-width: 530px;
width:60%;
min-width: 450px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background:black;

@media screen and (max-width:600px){
    padding:2rem;
}
@media screen and (max-width:500px){
    width: 100%;
    min-width: 0;
    padding:1rem;
    border-radius: 0;
}
`
export const TextContainer = styled.div`
gap: .5rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

export const Title = styled.h3`
font-size: var(--heading-3);
font-weight:bold;
color:white;
@media screen and (max-width:800px){
    font-size: var(--heading-3-mobile);
}
`
export const Subtitle = styled.p`
font-size: var(--body);
color:#D0D0D0;
text-align: center;
padding: 0;
margin:0;
`
export const Form = styled.form`
gap:2rem;
width: 100%;
display: flex;
flex-direction:column;
align-items: center;
justify-content: center;
`
export const Inputs = styled.div`
width: 100%;
gap:1rem;
display: flex;
flex-direction:column;
align-items: center;
justify-content: center;
`

export const SignInButtonContainer = styled.div`
width: 100%;
gap:.5rem;
display: flex;
flex-direction:column;
align-items: center;
justify-content: center;
`
export const SignInButton =styled.button`
border:none;
background:orange;
padding: .75rem 1rem;
font-size: var(--body);
border-radius: 6px;
width:100%;
background-color:orange;

&:hover{
    background-color: var(--main-color-dark);
}
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

export function setCookies(cookieObject, setCookie){
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);

    Object.entries(cookieObject).forEach(([key, value]) => {
        setCookie(key, value, { path: "/", expires: tomorrow });
    });
}

const SUBTITLE = 'Enter your details to sign in to your account and join us';
function LoginPage(){
    let navigate = useNavigate();
    const {state}= useLocation();

    const [formData, setFormData] = useState({
        email : "",
        password : "",
    })

    const [cookies,setCookie,removeCookie] = useCookies(["token"])
    const [errors, setErrors] = useState({error_fields:[], messages:{}});

    const imageContainerRef = useRef();
    const {scrollYProgress} =  useScroll({
        target: imageContainerRef,
        offset: ['0' , 'end start']
    })
    
    const imageContainerY =useTransform(scrollYProgress, [0,1], ['0%', '-10%']);
    const imageY = useTransform(scrollYProgress,[0,1], ['0%', '28%']);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
      
    useEffect(()=>{
        if(cookies.token) 
        navigate('/home',{replace:true})
    },[])

    useEffect(()=>{
        if(state !=null)
        setFormData((prev) => ({...prev, email : state.email}));
    })

    async function requestLogin(user){
        const URL = `${process.env.REACT_APP_API_URL}/api/auth/login`;
        const INIT = {
            method:"POST",
            body:JSON.stringify(user),
            headers :{'Content-Type': 'application/json'},
        }

        const request = await fetch(URL,INIT)
        const response = await request.json();
        
        return [request, response];
    }

    async function handleSubmit(e){
        e.preventDefault()
        const [request, response] = await requestLogin(formData);

        if (request?.status == 200){
            const data = response.data
            const cookiesToSet = {
                token: data.token,
                email: data.user.email,
                username: data.user.username,
                id: data.user.id,
                pfp: data.user.pfp
            };

            setCookies(cookiesToSet,setCookie);
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
            <BackgroundImageContainer as={motion.div} style={{y:imageContainerY}} ref={imageContainerRef}>
                <BackgroundImage as={motion.img} style={{y:imageY}} src={MoviesBackground} alt="movies posters grid background"/>
            </BackgroundImageContainer>
            <ContentContainer>
                <FormContainer>
                    <TextContainer>
                        <Title>Sign In</Title>
                        <Subtitle>{SUBTITLE}</Subtitle>
                    </TextContainer>
                    <Form onSubmit={handleSubmit}>
                        <Inputs>
                            <TextInput label={'inner'} errors={errors} formData={formData} setFormData={setFormData} name="email" type="email"/>
                            <TextInput label={'inner'} errors={errors} formData={formData} setFormData={setFormData} name="password" type="password" />
                        </Inputs>
                        <SignInButtonContainer>
                            <Link id="login-forgot-password" to="#">Forgot password ?</Link>
                            <SignInButton>Sign in</SignInButton>
                        </SignInButtonContainer>
                        <SocialMediaContainer>
                            <p style={{margin:'0'}}>Or login with</p>
                            <SocialMediaButtons>
                                <Google />
                            </SocialMediaButtons>
                        </SocialMediaContainer>

                        <div>
                            <p style={{marginRight:'5px',display:"inline"}}>Don't have an account ?</p>
                            <Link style={{color:"var(--main-color)"}} to="/register">Sign up !</Link>
                        </div>
                    </Form>
                </FormContainer>
            </ContentContainer>
        </Container>
    )

}

export default LoginPage;