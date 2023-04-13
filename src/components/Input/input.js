import React, {  useState }  from "react";
import './input.css';
import {useNavigate} from 'react-router-dom'

function InputField(props){
    const [text, setText] = useState("");
    const navigate =useNavigate();
    function handleSubmit(e){
        e.preventDefault();
        navigate("/register", {state: {text}})
    }
    return(
       <form onSubmit={handleSubmit} >
            { props.lab ==true ? <label id="elabel">Enter your email, and join the best comunity</label> : null}
            <div className="input-container">
                <input type="email" id="em" value={text} onChange={(e)=>{setText(e.target.value)}} required ></input>
                <label id="Email-label">Email Address</label>
                <input type="submit" value="submit" id="sb"></input>
            </div>
        </form>
    )
}

export default InputField;