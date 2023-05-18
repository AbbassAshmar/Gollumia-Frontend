import React, { useEffect,useState} from 'react';
import { Button } from 'reactstrap';
import "./Register.css"

import { Link, useLocation } from "react-router-dom";
import Navbar from '../../components/Navbar/navbar';
import { useNavigate } from 'react-router-dom';
import {useCookies} from "react-cookie";

//1 --> passwords don't match
//2 --> email already used
//3 --> Your password must be at least 8 characters



function Register(){
    let navigate = useNavigate()
    const {state}= useLocation();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [passvalidation, setPassvalidation] = useState(0);
    const [cookies, setCookies,removeCookie] = useCookies(["token"]);
    const [errorMessage, seterrorMessage] = useState("")
    
    useEffect(()=>{
        if (cookies.token){
            navigate("/movies", {replace:true})
        }
        if(state !=null){
            setEmail(state.text);
        }},[])

    function verifyPass(pass, repass){
        if(pass.length < 8){
            setPassvalidation(3)
            seterrorMessage("Your password must be at least 8 characters")
            return false
        }
        else{
            if(pass !== repass){
            setPassvalidation(1)
            seterrorMessage("Passwords don't match")
            return false
            
            }
            else{
                setPassvalidation(0)
                seterrorMessage("")
                return true
            }
        }
        
    }
    function handleSubmit(e) {
        e.preventDefault();
        const user = {username , email,password}
        if (verifyPass(password,repassword)){
            fetch("http://127.0.0.1:8000/users/",{
                'method' : 'POST',
                headers :{
                    'Content-Type': 'application/json',
                    'Authorization': ''
                },
                body: JSON.stringify(user)})
            .then((res)=>{
                if(res.status== 403){
                setPassvalidation(2)
            }
                return (res.json())})
            .then(res =>{
                let token = res.token
                let id= res.user.id
                let name =  res.user.username
                let email = res.user.email
                setCookies("token",token, {path: '/'})
                setCookies("email",email, {path: '/'})
                setCookies("username",name, {path: '/'})
                setCookies("id",id, {path: '/'})
                setCookies("pfp",res.user.pfp, {path: '/'})

                navigate("/movies", { replace: true })
                return res.user;
            })
            .catch((error)=>{console.log(error)})
        }
    }

    const inputNostate = {
        cursor: "pointer",
        border:"none",
        outline: "none",
        borderBottom : "none",
        transform:"translateY(.8rem)",
    }
    return(
        
        <div className='register-page'>
            <header>
                <Navbar />
            </header>
            <div className='register-form-container'>
                <h2>Sign up</h2>
                <form onSubmit={handleSubmit}>
                    <div className='register-form-div'>
                        <input required type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}}></input>
                        <label className='register-form-label'>Username</label>
                    </div>
                    <div className='register-form-div'>
                        {state == null ? <input required type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}></input> : <input required style={inputNostate} readOnly={true} type="email" value ={state.text}></input>}
                        {state== null ?<label className='register-form-label'>Email</label>:<label className='register-form-label-disabled'>Email</label>}
                        <p style={passvalidation==2?{display:"block",margin:"1rem 0 0 0"}:null}>email already used !</p>
                    </div>
                    <div className='register-form-div'>
                        <input style={passvalidation==1 || passvalidation==3?{borderBottom:"2px solid red"}:null}  type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required></input>
                        <label className='register-form-label'>Password</label>
                        <p style={passvalidation==3 ?{display:"block"}:null} >{errorMessage}</p>
                    </div>
                    <div className='register-form-div'>
                        <input style={passvalidation==1 ?{borderBottom:"2px solid red"}:null} type="password"  value={repassword} onChange={(e)=>{setRepassword(e.target.value)}} required></input>
                        <label className='register-form-label'>Confirm Password</label>
                        <p style={passvalidation ==1 ?{display:"block"}:null} >{errorMessage}</p>
                    </div>
                    
                    <div className='register-form-div register-page-checkbox'>
                        <input type="checkbox"></input>
                        <label>Remember me</label>
                    </div>
                    <div className='register-form-div register-page-buttons'>
                        <Button className='register-page-submit-button' style={{background:"orange",cursor: 'pointer',color:'white'}} type="submit"  id="signin" color="warning">Submit</Button>
                        <div className='register-page-singIn'>
                            <p style={{display:"block",color:'white'}}>already have an account ?</p>
                            <Link className="sign-in" to={'/login'}>Sign in<i id='arrow' className="fa-solid fa-arrow-right"></i></Link>
                        </div>
                    </div>    
                </form>
            </div>
        </div>
    )
}

export default Register;