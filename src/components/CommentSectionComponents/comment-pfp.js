import { useEffect, useState } from "react";
import styled from "styled-components";


const SquareDiv = styled.div`
height :56px;
width:56px;
border-radius:17px;
background-color:orange;
display:flex;
justify-content:center;
align-items:center;
font-size:2.2rem;
font-weight:900;
`
let Div = styled.div`
height :56px;
width:56px;
border-radius:17px;
overflow :hidden;
`
let Img = styled.img`
width:100%;
height:100%;
`

function CmntPfp(props){
    
    return(
        <Div>
            {
            (props.letter && props.letter.length > 1 )?
            <Img src={props.letter}/>:
            <SquareDiv>
                {props.letter}
            </SquareDiv>    
            }    
        </Div>
    )

}

export default CmntPfp;