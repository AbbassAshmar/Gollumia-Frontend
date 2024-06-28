import {React, useEffect, useState} from 'react'
import styled from 'styled-components';
import {  useCookies } from 'react-cookie';
import { setCookies } from '../LoginPage/login-page';
import TextInput from '../../components/TextInput/text-input';
import ProfilePicture from '../../components/ProfilePicture/profile-picture';
import { removeCookies } from '../../components/MainNavbar/components/UserProfileOrSignIn/user-profile-or-sign-in';
import { useNavigate } from 'react-router-dom';
import PopUp from '../../components/PopUp/pop-up';

const Container = styled.div`
margin:0;
padding:0;
width:100%;
background:black;
`

const Content = styled.div`
overflow: hidden;
position:relative;
padding: 4rem 0;
gap:2rem;
width:60%;
display:flex;
margin:auto;
flex-direction: column;
align-items: flex-start;
@media screen and (max-width:1024px) {
width: 100%;
padding:4rem 2rem
}
@media screen and (max-width:800px) {
padding:4rem 1rem
}
`

const TitleContainer = styled.div`
font-size:var(--heading-5);
color:white;
font-weight:bold;
`

const Form = styled.form`
gap:2rem;
width:100%;
display:flex;
margin:auto;
align-items:flex-start;
justify-content: flex-end;
@media screen and (max-width:800px) {
    flex-direction: column;
}
`

const ProfilePictureContainer = styled.label`
height:200px;
width:200px;
display:block;
cursor: pointer;
border-radius: 50%;
overflow:hidden;
@media screen and (max-width:500px){
    width:100%;
    height:auto;
    aspect-ratio: 1/1;
}
`

const ProfileLetter = styled.div`
color:white;
height:100%;
width:100%;
display: flex;
font-size: 6rem;
font-weight:bold;
align-items: center;
justify-content: center;
background-color:var(--main-color);
@media screen and (max-width:500px){
    
}
`
const InputsContainer = styled.div`
flex:1;
width:100%;
display: flex;
flex-direction: column;
`
const EmailUsername = styled.div`
gap:1rem;
width:100%;
display: flex;
margin-bottom: 2rem;
flex-direction: column;
`
const ChangePassword = styled.p`
color:white;
width:100%;
cursor:pointer;
font-size: var(--body);
margin-bottom: 2rem;
&:hover{
    color:var(--main-color);
}
`
const PasswordsContainer = styled.div`
width:100%;
gap:1rem;
width:100%;
display: flex;
flex-direction: column;
overflow: hidden;
transition: max-height .4s, margin-bottom .2s;
margin-bottom:${({$show}) => $show ? "2rem" : "0"};
max-height:${({$show}) => $show ? "700px" : "0"};
`

const SubmitButton = styled.button`
border:none;
width:100%;
border-radius: 8px;
padding:.75rem 1rem;
font-size: var(--body);
color:white;
font-size:bold;
background-color: var(--main-color);
&:hover{
    background-color: var(--main-color-dark);
}

&:disabled{
    opacity: .7;
    background-color: grey;
}
`
function UserPage(){
    const navigate = useNavigate();

    const [showPasswords, setShowPasswords] = useState(false);
    const [popUpMessage, setPopUpMessage] = useState({show:false, message:"", status:"success"});

    const [cookie,setCookie, removeCookie] = useCookies();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({error_fields:[], messages:[]});

    const [displayedPFP, setDisplayedPFP] = useState(cookie.pfp)
    const [formData, setFormData] = useState({
        email : cookie.email,
        username : cookie.username,
        new_password : "",
        old_password : "" ,
        confirm_password : "",
    })

    useEffect(()=>{
        setDisplayedPFP(cookie.pfp)
    },[cookie.pfp])

    useEffect(()=>{
        return ()=>{
            if (displayedPFP && displayedPFP != cookie.pfp)
            URL.revokeObjectURL(displayedPFP);
        }
    },[])

    function handleReponse(request, response){
        if (request == null){ 
            setPopUpMessage({show:true, message:"Service Unavailable", status:"error"});
            setErrors({
                messages: {},
                error_fields: [], 
            })
        }

        else if (request.status == 200){
            setPopUpMessage({show:true, message:"Profile Updated", status:"success"});
            
            setCookies(response.data.user,setCookie)
            setErrors({
                messages: {},
                error_fields: [], 
            })
        }

        else if (request.status == 400){
            setErrors({
                messages: response.error?.details,
                error_fields: response.metadata?.error_fields, 
            })
        }

        else if (request.status == 401){
            removeCookies(["token","username", "id", "email", "pfp"],removeCookie)
            navigate("/",{replace:true})
        }

        else{
            setPopUpMessage({show:true, message:"Try again later", status:"error"});
            setErrors({
                messages: {},
                error_fields: [], 
            })
        }
    }

    async function requestUpdateUser(data){
        const URL = `${process.env.REACT_APP_API_URL}/api/auth/users`
        const INIT = {
            method:"PATCH",
            headers:{"Authorization":"Token "+cookie.token},
            body:data
        }

        try {
            let request = await fetch(URL,INIT);
            let response = await request.json();    
            handleReponse(request, response)
        }
        catch(error){
            handleReponse(null, null)
        }
        
        setIsLoading(false);
    }
    
    function handleFormSubmit(e){
        e.preventDefault();

        let formDataObject = new FormData(e.currentTarget);
        for (let key in formData){
            formDataObject.append(key, formData[key]);
        }

        setIsLoading(true);
        requestUpdateUser(formDataObject)
    }

    function handlePfpInputChange(e){
        if (displayedPFP && displayedPFP != cookie.pfp){
            URL.revokeObjectURL(displayedPFP);
        }

        let image = e.currentTarget.files[0];
        let src = URL.createObjectURL(image);
        setDisplayedPFP(src);
    }

    function handleChangePasswordTextClick(e){
        setShowPasswords(!showPasswords);
    }

    return(
        <Container>
            <PopUp details={popUpMessage} setDetails={setPopUpMessage}/>
            <Content>
                <TitleContainer>
                    <i style={{marginRight:".5rem"}} className="fa-regular fa-user"/> Update Profile
                </TitleContainer>
                <Form onSubmit={handleFormSubmit}>
                    <ProfilePictureContainer htmlFor="pfp_input_user_page">
                        <input 
                        disabled={isLoading}
                        id="pfp_input_user_page" 
                        onChange={handlePfpInputChange} 
                        name={"pfp"} type='file' accept=".jpg,.jpeg,.png" 
                        style={{width:'1px' , position:"absolute", visibility:"hidden"}}/>       
                        <ProfilePicture style={{fontSize:"clamp(4rem,40vw,9rem)"}} src={displayedPFP}/>
                    </ProfilePictureContainer>
                    <InputsContainer>
                        <EmailUsername>
                            <TextInput isLoading={isLoading} label={'outer'} errors={errors} formData={formData} setFormData={setFormData} name="username" type="text" placeholder="username"/>
                            <TextInput isLoading={isLoading} label={'outer'} errors={errors} formData={formData} setFormData={setFormData} name="email" type="email" placeholder="ex. ab@gmail.com"/>
                        </EmailUsername>
                        <ChangePassword onClick={handleChangePasswordTextClick}>Change Password</ChangePassword>
                        <PasswordsContainer $show={showPasswords}>
                            <TextInput isLoading={isLoading} label={'outer'} errors={errors} formData={formData} setFormData={setFormData} name="old_password" type="password" placeholder="your password"/>
                            <TextInput isLoading={isLoading} label={'outer'} errors={errors} formData={formData} setFormData={setFormData} name="new_password" type="password" placeholder="ex. Ab43j#245jgi"/>
                            <TextInput isLoading={isLoading} label={'outer'} errors={errors} formData={formData} setFormData={setFormData} name="confirm_password" type="password" placeholder="re-write new password"/>
                        </PasswordsContainer>
                        <SubmitButton type='submit' disabled={isLoading}>Update profile</SubmitButton>
                    </InputsContainer>
                </Form>
            </Content>
        </Container>
          
    )
}

export default UserPage;