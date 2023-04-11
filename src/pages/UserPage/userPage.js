import {React, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import App from '../components/Footer';
import MoviesNav from '../components/moviesNavbar';
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

`
const Div = styled.div`
width:53%;
display:flex;
margin:auto;
flex-wrap:wrap;
`
const InputLabel = styled.label`
display: inline-block;
width:100%;
height:24vh;
border-radius:50%;
cursor: pointer;
`
const Img = styled.div`
width:100%;
height:100%;
border-radius:50%;
`

const H2 = styled.h2`
display:block;
margin-left:28.5%
`
function UserPage(){
    const [display,setDisplay] = useState(false)
    const [cookie,setCookies] = useCookies("token")
    const [info, setInfo] = useState({email:cookie.token[1], username:cookie.token[2]})
    const [img, setImg] = useState({currentImg:(cookie.token[4]?cookie.token[4]:cookie.token[2][0]),newImg:""})
    const {username} = useParams()

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
        width:"100%",        
    }
    let inputLabelStyle ={
        position:"relative",
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
                <H2>Edit Profile</H2>
                <Container>
                    <Form style={FormStyle} row>
                        <Div>
                            <div style={{flex:"1",marginLeft:".3rem"}}>
                                <div style={{padding:"1rem"}}>
                                <FormGroup>
                                    <InputLabel className={styles.inputLabelStyleBg} style={inputLabelStyle} >
                                        {img.currentImg.length>2?null:
                                        <div style={{fontSize:" clamp( 6rem, 9vw, 9vw)",position:"absolute",zIndex:"2",left:"25%",top:"-10%",}}>{cookie.token[2][0].toUpperCase()}</div>
                                        }
                                        <Input onChange={handleImage} type="file" accept="image/*" style={ImageStyle}></Input>
                                    </InputLabel>
                                </FormGroup>
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
                </Container>
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