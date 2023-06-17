import React, { useEffect,useState} from 'react';
import { Button } from 'reactstrap';
import "./Register.css"
import { Link, useLocation } from "react-router-dom";
import Navbar from '../../components/Navbar/navbar';
import { useNavigate } from 'react-router-dom';
import {useCookies} from "react-cookie";


const inputNostate = {
    cursor: "pointer",
    border:"none",
    outline: "none",
    borderBottom : "none",
    transform:"translateY(.8rem)",
}


function Register(){
    let navigate = useNavigate()
    const {state}= useLocation();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setconfirmPass] = useState("");
    const [cookies, setCookies] = useCookies(["token"]);
    const [errorMessage, setErrorMessage] = useState({})
    
    useEffect(()=>{
        if (cookies.token){
            navigate("/movies", {replace:true})
        }
        if(state !=null){
            setEmail(state.text);
        }},[])


    async function handleRegisterSubmit(e){
        e.preventDefault();
        const user = {username , email,password,confirmPass}
        const request = await fetch("http://127.0.0.1:8000/users/",{
            headers :{
                "Content-type":"application/json"
            },
            method: 'POST',
            body: JSON.stringify(user)}
        )
        const response = await request.json();
        console.log(response.error)
        console.log(request)
        if (request.status == 201){
            setErrorMessage({})
            let token = response.token
            let id= response.user.id
            let name =  response.user.username
            let email = response.user.email
            const pfp = response.pfp && response.pfp != "null" ? 'http://127.0.0.1:8000'+response.pfp : null 
            setCookies("token",token, {path: '/'})
            setCookies("email",email, {path: '/'})
            setCookies("username",name, {path: '/'})
            setCookies("id",id, {path: '/'})
            setCookies("pfp",pfp, {path: '/'})
            navigate("/home", { replace: true })
        }else if (request.status == 400){
            console.log("hrere")
            if (response.error === 'Passwords do not match !') {
                setErrorMessage({matchError: response.error});
            } else if (response.error === 'invalid email') {
                setErrorMessage({emailError: response.error});
            } else if (response.error === "Your password must be at least 8 characters !") {
                setErrorMessage({lengthError: response.error});
            } else if (response.error === "Password must contain numbers and characters !") {
                setErrorMessage({charError: response.error});

            }
        }

    }
  
    return(
        
        <div className='register-page'>
            <header>
                <Navbar />
            </header>
            <div className='register-form-container'>
                <h2>Sign up</h2>
                <form onSubmit={handleRegisterSubmit}>
                    <div className='register-form-div'>
                        <input required type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}}></input>
                        <label className='register-form-label'>Username</label>
                    </div>
                    <div className='register-form-div'>
                        {state == null ? 
                        <input
                            required 
                            type="email" 
                            value={email} 
                            onChange={(e)=>{setEmail(e.target.value)}}
                            />: 
                        <input 
                            required 
                            style={inputNostate} 
                            readOnly={true} 
                            type="email" 
                            value={state.text}
                        />}
                        {
                            state== null ?
                            <label className='register-form-label'>Email</label>:
                            <label className='register-form-label-disabled'>Email</label>
                        }
                        <p style={errorMessage.emailError?{display:"block",margin:"1rem 0 0 0"}:null}>
                            email already used !
                        </p>
                    </div>
                    <div className='register-form-div'>
                        <input 
                            style={errorMessage.matchError|| errorMessage.lengthError || errorMessage.charError?{borderBottom:"2px solid red"}:null}  
                            type="password" 
                            value={password} 
                            onChange={(e)=>{setPassword(e.target.value)}} 
                            required
                        />
                        <label className='register-form-label'>Password</label>
                        <p style={errorMessage.lengthError || errorMessage.charError?{display:"block"}:null} >
                            {errorMessage.lengthError?errorMessage.lengthError:errorMessage.charError}
                        </p>
                    </div>
                    <div className='register-form-div'>
                        <input 
                            style={errorMessage.matchError?{borderBottom:"2px solid red"}:null} 
                            type="password"  
                            value={confirmPass} 
                            onChange={(e)=>{setconfirmPass(e.target.value)}} 
                            required 
                        />
                        <label className='register-form-label'>Confirm Password</label>
                        <p style={errorMessage.matchError?{display:"block"}:null} >
                            {errorMessage.matchError}
                        </p>
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