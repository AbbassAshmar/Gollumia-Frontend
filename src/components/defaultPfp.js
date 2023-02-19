import styled from "styled-components"

const Div = styled.div`
    height : 37px;
    width:37px;
    border-radius:50%;
    background-color:orange;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:1.3rem;
    font-weight:900;
`

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
function DefaultPfp(props){
    return (
        <div style={{transform:`scale(${props.sc})`}}>         
            {props.square==true?
            <SquareDiv>
                {props.letter.toUpperCase()}
            </SquareDiv>
            :
            <Div>
                {props.letter.toUpperCase()}
            </Div>
            }
        </div>
        
    )
}

export default DefaultPfp;