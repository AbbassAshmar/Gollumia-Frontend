import {React, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import App from '../../components/Footer/Footer';
import MoviesNav from '../../components/MainNavbar/moviesNavbar';
import styles from  "./userPage.module.css"
import styled from 'styled-components';
import { Form,FormGroup,Input,Label,Col } from 'reactstrap';
import { useCookies } from 'react-cookie';

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
    const [img, setImg] = useState({currentImg:(cookie.token[4]?cookie.token[4]:cookie.token[2][0]),newImg:""})


    function handleImage(e){
        let image= e.target.files[0] // get the file from the input
        const reader = new FileReader(); // fileReader instance
        reader.onload =()=>{ // after the fileReader finishes loading the asynch.
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
    }
    if (img.newImg!=""){
    inputLabelStyle.backgroundSize="100% 100% "
    inputLabelStyle.backgroundRepeat="no-repeat"
    inputLabelStyle.backgroundPosition="center"
    inputLabelStyle.backgroundImage=`url(${img.newImg})`
    }else{
        if(img.currentImg.length>2){
        inputLabelStyle.backgroundSize="100% 100% "
        inputLabelStyle.backgroundRepeat="no-repeat"
        inputLabelStyle.backgroundPosition="center"
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
                    <Form style={FormStyle} row>
                        <Div>
                            <div style={{flex:"1",margin:"2rem 0 0 0"}}>
                                <div>
                                    <InputLabel style={inputLabelStyle} >
                                        {img.currentImg.length>2?null:
                                        <LabelLetter>{cookie.token[2][0].toUpperCase()}</LabelLetter>
                                        }
                                        <Input onChange={handleImage} type="file" accept="image/*" style={ImageStyle}></Input>
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
                                    <Input value={info.username} onChange={(e)=>{setInfo({...info,username:e.target.value})}} id="usernameInput"></Input>
                                </FormGroup>
                                <button onClick={()=>{setDisplay(!display)}} type="button" style={{display:"flex",alignItems:"center",gap:".9em",marginBottom:".4em"}}>
                                    <i style={{color:"white"}} className="fa-solid fa-key"></i><p  style={{margin:"0",color:"white"}}>Change Password</p>
                                </button>
                                {display?
                                <div>
                                    <FormGroup>
                                        <Label sm={8} id='oldpasswordInput'>Old Password</Label>
                                        <Input for="oldpasswordInput"></Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label sm={7} id="newpasswordInput">New Password</Label>
                                        <Input for="newpasswordInput"></Input>
                                    </FormGroup>
                                    <FormGroup >
                                        <Label sm={9} id="confirmnewpassword">Confirm New Password</Label>
                                        <Input for="confirmnewpassword"></Input>
                                    </FormGroup>
                                </div>
                                :null}
                                <FormGroup>
                                    <div  style={{marginTop:"9%",width:"100%"}}> 
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