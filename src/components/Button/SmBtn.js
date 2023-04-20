import React from "react";
import  {MDBIcon} from 'mdb-react-ui-kit';
import styled from "styled-components";
import "./smBtn.css"
const Text = styled.p`
    margin:0;
    display:inline-block;
    font-size:1rem;
    @media screen and (max-width:520px){
        display: none;
        
    }
`
const Button = styled.button`
    padding:0rem .6rem .1rem .6rem;
    border-radius:10px;
    
`
function SmBtn (props){

    return(
        props.small == false ?
        <Button  style={{ backgroundColor: `${props.color}`,borderRadius:"2px",marginTop:"1rem",}}>
            <MDBIcon  style={{margin:"0"}} fab icon={props.icon} /> {props.media}
            <Text>{props.text}</Text>
        </Button>
        :
        <Button size="bg" style={{ backgroundColor: `${props.color}` ,margin:"0 5px 0 0", transform:"translateX(-91%)"}}>
            <MDBIcon fab icon={props.icon} />
            <p style={{display:"inline-block",margin:"0"}}>{props.text}</p>
        </Button>
        
    )
}
export default SmBtn;