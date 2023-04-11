import React from "react";
import  {MDBIcon} from 'mdb-react-ui-kit';
import {Button} from 'reactstrap'
function SmBtn (props){
    return(
        props.small == false ?
        <Button  style={{ backgroundColor: `${props.color}`}}>
            <MDBIcon className='me-2' fab icon={props.icon} /> {props.media}
            <p style={{display:"inline-block",margin:"0"}}>{props.text}</p>
        </Button>

        :
        <Button size="bg" style={{ backgroundColor: `${props.color}` ,margin:"0 5px 0 0", transform:"translateX(-91%)"}}>
            <MDBIcon fab icon={props.icon} />
            <p style={{display:"inline-block",margin:"0"}}>{props.text}</p>
        </Button>
        
    )
}
export default SmBtn;