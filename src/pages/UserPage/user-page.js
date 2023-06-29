import {React, useEffect, useState} from 'react'
import App from '../../components/Footer/footer';
import MoviesNav from '../../components/MainNavbar/movies-navbar';
import styled from 'styled-components';
import { Form,FormGroup,Input,Label,Col } from 'reactstrap';
import { Cookies, useCookies } from 'react-cookie';
import MoviePageFooter from '../SingleMoviePage/MoviePageFooter/movie-page-footer';
import { animate, motion, transform, useAnimate } from 'framer-motion';
const Section = styled.div`
    margin:0;
    padding:0;
    font-weight:400;
    background:black;
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
const LabelLetter = styled.div`
    font-size:7rem;
    padding: 0 0 1rem 0;
    @media screen and (max-width:800px){
        font-size:4.5rem;
    }
`
const H2 = styled.h2`
    width:70%;
    display:flex;
    justify-content:space-between;
    margin:2rem 0 0 20%;
    color:white;
    @media screen and (max-width:1200px){
        margin:2rem 0 0 0;
        width:80%;
    }
    @media screen and (max-width:1075px){
        margin:2rem 0 0 0;
        width:90%;
    }
    align-items:flex-end;
`
const SuccessMessage = styled.p`
    color:green;
    font-size:1.4rem;
    padding :3px;
    border:2px solid green;
    border-radius:7px;
    @media screen and (max-width:1075px){
        font-size:.9rem;
        padding :3px;
        border:1px solid green;
        border-radius:7px;
    }
`
function UserPage(){
    const [display,setDisplay] = useState(false)
    const [cookie,setCookies] = useCookies(['token','pfp','username','email'])
    const [info, setInfo] = useState({email:cookie.email, username:cookie.username})
    const [passwordError , setPasswordError] = useState("")
    const [successMessage, setSuccessMessage] = useState(false)
    const [scope, animate] = useAnimate()
    const [img, setImg] = useState({currentImg:(cookie.pfp !="null" && cookie.pfp?
    cookie.pfp:cookie.username[0]),newImg:""})
    
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
            setDisplay(false)
            setSuccessMessage(true)
            for(let [key,value] of Object.entries(response)){
                setCookies(key,value,{path:"/"})
            }
        }else{
            setPasswordError(response["error"])
        }
    }
    
    function handleFormSubmit(e){
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        request_update(formData)
    }

    function handleImage(e){
        let image= e.target.files[0] // get the file from the input
        const reader = new FileReader(); // fileReader instance
        reader.onload =()=>{ // after the fileReader finishes loading async.
            setImg({currentImg:"3333",newImg:reader.result}) // update the state to include the uploaded url
        }
        reader.readAsDataURL(image) // read the image as a url representing it
    }

    useEffect(()=>{
        if(successMessage) {
            animate(scope.current, {opacity:[1,1,1,1,0]},{duration:10})
            setSuccessMessage(false)
        }
    },[successMessage])
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
            inputLabelStyle.backgroundImage=`url('${img.currentImg}')`
        }else{
            inputLabelStyle.background='orange'
        }
    }
 
    return(
        <div style={{minHeight: "100vh",background: "black"}}>
            <MoviesNav/>
            <Section>
                <Content>
                    <H2>
                        <p> 
                            <i className="fa-solid fa-person-praying"/> Edit Profile
                        </p>
                        <SuccessMessage 
                            ref={scope}
                            as={motion.h2}
                            initial={{opacity:0}}
                        >
                            <i class="fa-regular fa-circle-check" style={{marginRight:".4rem"}}/>Info Saved
                        </SuccessMessage>
                    </H2>
                    <Form onSubmit={handleFormSubmit} style={FormStyle} row>
                        <Div>
                            <div style={{flex:"1",margin:"2rem 0 0 0"}}>
                                <div>
                                    <InputLabel style={inputLabelStyle} >
                                        {img.currentImg.length>2?null:
                                        <LabelLetter>{cookie.username[0].toUpperCase()}</LabelLetter>
                                        }
                                        <Input name="pfp" onChange={handleImage} type="file" accept="image/*" style={ImageStyle}></Input>
                                    </InputLabel>
                                </div>
                            </div>
                            <div style={{flex:"2"}}>
                                <div style={{padding:"1rem"}}>
                                <FormGroup>
                                    <Label for="emailInput" sm={2} defaultValue>Email</Label>
                                    <Input 
                                        value={info.email} 
                                        onChange={(e)=>{setInfo({...info,email:e.target.value})}} 
                                        id='emailInput' 
                                        name='email' 
                                        type='email'
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label sm={2} for="usernameInput">Username</Label>
                                    <Input  
                                        name="username" 
                                        value={info.username} 
                                        onChange={(e)=>{setInfo({...info,username:e.target.value})}} 
                                        id="usernameInput"
                                    />
                                </FormGroup>
                                <button onClick={()=>{setDisplay(!display)}} type="button" style={{display:"flex",alignItems:"center",gap:".9em",marginBottom:".4em"}}>
                                    <i style={{color:"white"}} className="fa-solid fa-key"/>
                                    <p  style={{margin:"0",color:"white"}}>Change Password</p>
                                </button>
                                <div style={{maxHeight:`${display?"30rem":"0"}`,transition:"max-height .5s",overflow:"hidden"}}>
                                    <FormGroup>
                                        <Label sm={8} id='oldpasswordInput'>Old Password</Label>
                                        <Input style={{border:`${passwordError[0] =="o" ?"1px solid red":"none"}`}} 
                                            type="password" 
                                            for="oldpasswordInput"
                                            name="oldPassword"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label sm={7} id="newpasswordInput">New Password</Label>
                                        <Input style={{border:`${passwordError !="" && passwordError[0]!='o'?"1px solid red":"none"}`}} 
                                            for="newpasswordInput"
                                            type='password'
                                            name='newPassword' 
                                        />
                                    </FormGroup>
                                    <FormGroup >
                                        <Label sm={9} id="confirmnewpassword">Confirm New Password</Label>
                                        <Input style={{border:`${passwordError =="passwords don't match"?"1px solid red":"none"}`}} 
                                            for="confirmnewpassword"
                                            type='password'
                                            name='confirmPassword' 
                                        />
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
            <MoviePageFooter />
        </div>
    )
}

export default UserPage;