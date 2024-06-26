import React, { useEffect,useRef,useState} from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {useCookies} from "react-cookie";
import { Container, BackgroundImage, BackgroundImageContainer ,ContentContainer, FormContainer, TextContainer, Title, Subtitle, Form, Inputs, SignInButtonContainer, SignInButton} from '../LoginPage/login-page';
import moviesPosters from "../../photos/moviesPosters.jpg";
import TextInput from '../../components/TextInput/text-input';
import styled from 'styled-components';
import { setCookies } from '../LoginPage/login-page';
import { motion, useScroll, useTransform } from 'framer-motion';
import PopUp from '../../components/PopUp/pop-up';


const RememberMeContainer = styled.div`
display: flex;
gap: 0.5rem;
align-items: center;
`

function Register(){
    let navigate = useNavigate();
    const [cookies, setCookie] = useCookies();
    const [isLoading, setIsLoading] = useState(false)
    const [popUpMessage, setPopUpMessage] = useState({show:false, message:"", status:"success"});

    const [errors, setErrors] = useState({
        error_fields:[],
        messages:{}
    });

    const [formData, setFormData] = useState({
        username : "",
        email : "",
        password : "",
        confirm_password: "",
    })

    useEffect(()=>{
        if (cookies.token)
        navigate("/movies", {replace:true})
    },[])

    useEffect(()=>{
        if (isLoading)
        requestRegister(formData);
    }, [isLoading])

    const imageContainerRef = useRef();
    const {scrollYProgress} =  useScroll({
        target: imageContainerRef,
        offset: ['0' , 'end start']
    })
    
    const imageContainerY =useTransform(scrollYProgress, [0,1], ['0%', '-10%']);
    const imageY = useTransform(scrollYProgress,[0,1], ['0%', '28%']);

    function handleResponse(request, response){
        if (request == null) {
            setPopUpMessage({show:true, message:"Service Unavailable", status:"error"});
            setErrors({
                error_fields:[],
                messages:{}
            })
        }

        else if (request.status == 201){
            const data = response.data;
            const cookiesToSet = {
                token: data.token,
                email: data.user.email,
                username: data.user.username,
                id: data.user.id,
                pfp: data.user.pfp
            };

            setCookies(cookiesToSet, setCookie);
            setErrors({error_fields:[], messages:{}});
            navigate("/home", { replace: true })
        }
        
        else if (request.status == 400){
            setErrors({
                error_fields:response.metadata.error_fields,
                messages: response.error.details
            })
        }

        else {
            setPopUpMessage({show:true, message:"Try again later", status:"error"});
            setErrors({
                error_fields:[],
                messages:{}
            })
        }
    }

    async function requestRegister(user){
        const URL = `${process.env.REACT_APP_API_URL}/api/auth/register`
        const INIT = {
            headers :{"Content-type":"application/json"},
            method: 'POST',
            body: JSON.stringify(user)
        }

        try {
            const request = await fetch(URL, INIT);
            const response = await request.json();
            handleResponse(request, response);
        }
        catch(error){
            handleResponse(null, null);
        }
        
        setIsLoading(false)
    }

    async function handleRegisterSubmit(e){
        e.preventDefault();
        setIsLoading(true);        
    }
  
    return(
        <Container>
            <PopUp details={popUpMessage} setDetails={setPopUpMessage}/>
            <BackgroundImageContainer as={motion.div} style={{y:imageContainerY}} ref={imageContainerRef}>
                <BackgroundImage as={motion.img} style={{y:imageY}} src={moviesPosters} alt="movies posters collection"/>
            </BackgroundImageContainer>
            <ContentContainer>
                <FormContainer>
                    <TextContainer>
                        <Title>Sign Up</Title>
                        <Subtitle>Fill in your information to join our family</Subtitle>
                    </TextContainer>
                    <Form onSubmit={handleRegisterSubmit}>
                        <Inputs>
                            <TextInput isLoading={isLoading} label={'inner'} setFormData={setFormData} formData={formData} errors={errors} type="text" name="username"/>
                            <TextInput isLoading={isLoading} label={'inner'} setFormData={setFormData} formData={formData} errors={errors} type="email" name="email"/>
                            <TextInput isLoading={isLoading} label={'inner'} setFormData={setFormData} formData={formData} errors={errors} type="password" name="password"/>
                            <TextInput isLoading={isLoading} label={'inner'} setFormData={setFormData} formData={formData} errors={errors} type="password" name="confirm_password"/>
                        </Inputs>

                        <RememberMeContainer>
                            <input type="checkbox" />
                            <label>Remember me</label>
                        </RememberMeContainer>

                        <SignInButtonContainer>
                            <Link id="login-forgot-password" to="#">Forgot password ?</Link>
                            <SignInButton disabled={isLoading}>Sign up</SignInButton>
                        </SignInButtonContainer>

                        <div>
                            <p style={{marginRight:'5px',display:"inline"}}>already have an account ?</p>
                            <Link style={{color:"var(--main-color)"}} to="/login">Sign in !</Link>
                        </div>
                    </Form>
                </FormContainer>
            </ContentContainer>
        </Container>
            
    )

}
export default Register;