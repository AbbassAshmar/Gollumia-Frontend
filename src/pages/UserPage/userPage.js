import {React, useEffect, useState} from 'react'
import { json, useParams } from 'react-router-dom';
import App from '../../components/Footer/Footer';
import MoviesNav from '../../components/MainNavbar/moviesNavbar';
import styles from  "./userPage.module.css"
import styled from 'styled-components';
import { Form,FormGroup,Input,Label,Col } from 'reactstrap';
import { Cookies, useCookies } from 'react-cookie';

const Section = styled.div`
margin:0;
padding:0;
font-weight:400;
background:black;
`
const Container = styled.div`
overflow:hidden;
width:80%;
margin:auto;
`
const Content = styled.div`
width:80%;
display:flex;
margin:auto;
flex-direction:column;
align-items:start;

`
const Div = styled.div`
width:100%;
max-width:600px;
display:flex;
margin:auto;
flex-wrap:wrap;
@media screen and (max-width:900px){
    flex-direction:column;
}
`
const InputLabel = styled.label`
border-radius:50%;
cursor: pointer;
background-size:100% 100%;
background-repeat:no-repeat;
background-position:center;
display: flex;
align-items: center;
justify-content: center;
height: 140px;
width: 140px;
margin: auto;

@media screen and (max-width:800px){
    height: 100px;
    width: 100px;
}
`
const Img = styled.div`
width:100%;
height:100%;
border-radius:50%;
`
const LabelLetter = styled.div`
font-size:7rem;
padding: 0 0 1rem 0;
@media screen and (max-width:800px){
    font-size:4.5rem;
}
`
const H2 = styled.h2`
display:block;
margin:2rem 0 0 20%;
color:white;
@media screen and (max-width:1075px){
    margin:2rem 0 0 0;
}
`
function UserPage(){
    const [display,setDisplay] = useState(false)
    const [cookie,setCookies] = useCookies("token")
    const [info, setInfo] = useState({email:cookie.token[1], username:cookie.token[2]})
    const [passwords,setPasswords] = useState({oldPass:"",newPass:"",confirmPass:""})
    const [passwordError , setPasswordError] = useState("")
    const [img, setImg] = useState({currentImg:(cookie.token[4]?cookie.token[4]:cookie.token[2][0]),newImg:""})
    useEffect(()=>{console.log(cookie)},[cookie])
    function handlePasswordValidation(){
        if (passwords.newPass == "" && passwords.confirmPass==""){
            return null
        }
        if (passwords.newPass.length <8){
            return "password is should not be less than 1 character !";
        }
        if (!(passwords.newPass.match(".*\\d+.*"))){
            return "password should contain at least one digit !";
        }
        if (passwords.newPass != passwords.confirmPass){
            return "passwords don't match !";
        }
        if (passwords.oldPass == ""){
            return "old password required !";
        }
        return null
    }
    async function request_update (data){
        let send_request = await fetch(`http://localhost:8000/users/${cookie.id}/`,{
            method:"PATCH",
            headers:{
                "Authorization":"Token "+cookie.token
            },
            body:data
        })
        let response = await send_request.json()
        if (send_request.status == 200){
            console.log(response)
            for(let [key,value] of Object.entries(response)){
                console.log(key)
                console.log(value)
                setCookies(key,value,{path:"/"})
                
            }
            console.log(cookie)
        }
    }
    
    function handleFormSubmit(e){
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        if (handlePasswordValidation()){
            setPasswordError(handlePasswordValidation())
            return null
        }
        setPasswordError("")
        request_update(formData)
        // let response = send_request.json()
        // if (send_request.status == 400){
        //     setPasswordError("old password is not correct")
        // }
        // if (send_request.status == 200){
        //     setCookies("token", [cookie.token,response.email,response.username,response.user.id,response.user.pfp], {path :"/",expires:tomorrow})
        // }
    }
    function handleImage(e){
        let image= e.target.files[0] // get the file from the input
        const reader = new FileReader(); // fileReader instance
        reader.onload =()=>{ // after the fileReader finishes loading async.
            console.log(reader.result)
            setImg({currentImg:"3333",newImg:reader.result}) // update the state to include the uploaded url
        }
        reader.readAsDataURL(image) // read the image as a url representing it
    }
    const ImageStyle ={
       display:"none"
    }
    const FormStyle = { 
        overflow:"hidden",
        width:"100%",
        margin:"auto",     
    }
    let inputLabelStyle ={
        position:"relative",
        margin:"none",
        backgroundSize:"100% 100% ",
        backgroundRepeat:"no-repeat",
        backgroundPosition:"center",
    }
    if (img.newImg!=""){
        inputLabelStyle.backgroundImage=`url(${img.newImg})`
    }else{
        if(img.currentImg.length>2){
            inputLabelStyle.backgroundImage=`url('http://127.0.0.1:8000/${img.currentImg}')`
        }else{
            inputLabelStyle.background='orange'
        }
    }
 
    return(
        <div>
            <MoviesNav></MoviesNav>
            <Section>
                <Content>
                <H2><i className="fa-solid fa-person-praying"></i> Edit Profile</H2>
                    <Form onSubmit={handleFormSubmit} style={FormStyle} row>
                        <Div>
                            <div style={{flex:"1",margin:"2rem 0 0 0"}}>
                                <div>
                                    <InputLabel style={inputLabelStyle} >
                                        {img.currentImg.length>2?null:
                                        <LabelLetter>{cookie.token[2][0].toUpperCase()}</LabelLetter>
                                        }
                                        <Input name="image" onChange={handleImage} type="file" accept="image/*" style={ImageStyle}></Input>
                                    </InputLabel>
                                </div>
                            </div>
                            <div style={{flex:"2"}}>
                                <div style={{padding:"1rem"}}>
                                <FormGroup>
                                    <Label for="emailInput" sm={2} defaultValue>Email</Label>
                                    <Input value={info.email} onChange={(e)=>{setInfo({...info,email:e.target.value})}} id='emailInput' name='email' type='email'></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label sm={2} for="usernameInput">Username</Label>
                                    <Input  name="username" value={info.username} onChange={(e)=>{setInfo({...info,username:e.target.value})}} id="usernameInput"></Input>
                                </FormGroup>
                                <button onClick={()=>{setDisplay(!display)}} type="button" style={{display:"flex",alignItems:"center",gap:".9em",marginBottom:".4em"}}>
                                    <i style={{color:"white"}} className="fa-solid fa-key"></i><p  style={{margin:"0",color:"white"}}>Change Password</p>
                                </button>
                                <div style={{maxHeight:`${display?"30rem":"0"}`,transition:"max-height .5s",overflow:"hidden"}}>
                                    <FormGroup>
                                        <Label sm={8} id='oldpasswordInput'>Old Password</Label>
                                        <Input style={{border:`${passwordError[0] =="o" ?"1px solid red":"none"}`}} type="password" 
                                            onChange={(e)=>{setPasswords({...passwords,oldPass:e.target.value})}}
                                            value={passwords.oldPass} 
                                            for="oldpasswordInput"
                                            name="oldPassword">
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label sm={7} id="newpasswordInput">New Password</Label>
                                        <Input style={{border:`${passwordError !="" && passwordError[0]!='o'?"1px solid red":"none"}`}} 
                                            for="newpasswordInput"
                                            type='password'
                                            onChange={(e)=>{setPasswords({...passwords,newPass:e.target.value})}}
                                            value={passwords.newPass}
                                            name='newPassword' 
                                        ></Input>
                                    </FormGroup>
                                    <FormGroup >
                                        <Label sm={9} id="confirmnewpassword">Confirm New Password</Label>
                                        <Input style={{border:`${passwordError =="passwords don't match"?"1px solid red":"none"}`}} for="confirmnewpassword"
                                            type='password'
                                            onChange={(e)=>{setPasswords({...passwords,confirmPass:e.target.value})}}
                                            value={passwords.confirmPass} 
                                            name='confirmPassword' 
                                        ></Input>
                                        <p style={{color:"red",margin:"0",transform:"translateY(70%)"}}>{passwordError}</p>
                                    </FormGroup>
                                </div>
                                <FormGroup>
                                    <div  style={{marginTop:"6%",width:"100%"}}> 
                                        <Input style={{minWidth:"100%"}} type='submit'>Submit</Input>
                                    </div>
                                </FormGroup>
                                </div>
                            </div>
                        </Div>
                    </Form>
                </Content>
            </Section>
            <div style={{background:"black"}}>
                <div style={{height:"3.5rem",width:"100%"}}></div>
                <div className="emptyline"></div>
                <div style={{height:"1rem",width:"100%"}}></div>
                <App></App>
            </div>
        </div>
    )
}

export default UserPage;