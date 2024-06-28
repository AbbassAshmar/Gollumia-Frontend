import { useEffect } from "react";
import styled from "styled-components";

const SuccessMessage = styled.div`
z-index:200;
top:4rem;
color:	white;
position: fixed;
font-weight: bold;
border-radius: 8px;
padding:.75rem 1.5rem;
font-size:var(--heading-6);
transition:opacity .3s, right .3s;
opacity:${({$show}) => $show ? "1" : "0"};
right:${({$show}) => $show ? "1rem" : "-1rem"};
background-color: ${({$status}) => $status == "error" ? "rgba(242, 38, 19,1)" : "rgba(124,252,0,1)"} ;
`

export default function PopUp({details ,setDetails}){
    let {show, message, status} = details;

    useEffect(()=>{
        if(show)
        setTimeout(()=> setDetails((prev)=> ({...prev, show : false})), 5000)
    },[show])

    return(
        <SuccessMessage $status={status} $show={show}>
            <i style={{marginRight:".5rem"}} className={`fa-solid ${status=="error" ? "fa-xmark" :"fa-circle-check"}`}/> 
            {message}
        </SuccessMessage>
    )
}